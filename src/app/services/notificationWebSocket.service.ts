import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponse } from '../models/APIResponse.model';
import { Notification } from '../models/Notification.model';
import { RefreshToken } from '../models/RefreshToken.model';
import { User } from '../models/User.model';
import { AuthService } from './auth.service';
import { NotificationService } from './notificationApi.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  webSocket!: WebSocket;
  public notifications: Notification[] = [];
  public activeBell = true;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  public openNotificationChannel() {
    this.webSocket = new WebSocket('ws://localhost:8080/notification');

    this.webSocket.onopen = (event) => {
      console.log('Open:', event);
    };

    this.webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      let notification: Notification = message;
      this.userService.getProfile().subscribe((user: User) => {
        if (notification.receiverId === user.id) {
          if (notification.type === 'kick') {
            let refreshToken: RefreshToken = {
              refreshToken: user.refreshToken!,
            };
            this.authService.refreshToken(refreshToken).subscribe();
          }
          this.notificationService
            .saveNotification(notification)
            .subscribe((result) => {
              this.notifications.push(result);
            });
        }
      });
    };
    //---------------------------------------------------------
    this.notificationService.getNotifications().subscribe((result) => {
      this.notifications = result;
      this.activeBell = true;
    });
    //---------------------------------------------------------
    this.webSocket.onclose = (event) => {
      console.log('Close:', event);
    };
  }

  public sendNotification(notification: Notification) {
    this.webSocket.send(JSON.stringify(notification));
  }

  public closeNotificationChannel() {
    this.webSocket.close();
  }
}