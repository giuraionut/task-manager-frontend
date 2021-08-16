import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponse } from '../models/APIResponse.model';
import { Notification } from '../models/Notification.model';
import { RefreshToken } from '../models/RefreshToken.model';
import { User } from '../models/User.model';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  webSocket!: WebSocket;
  notifications: Notification[] = [];
  received: Boolean[] = [];
  private url = 'http://localhost:8080/notification/api';

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  //api------------------------------------------------------------------------------
  public saveNotification(
    notification: Notification
  ): Observable<Notification> {
    return this.http
      .post<APIResponse>(`${this.url}`, notification, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let notification: Notification = response.payload;
          return notification;
        })
      );
  }

  public getNotifications(): Observable<Array<Notification>> {
    return this.http
      .get<APIResponse>(`${this.url}`, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let notifications: Array<Notification> = response.payload;
          return notifications;
        })
      );
  }

  public deleteNotification(
    notification: Notification
  ): Observable<Notification> {
    return this.http
      .delete<APIResponse>(`${this.url}`, {
        body: notification,
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let notification: Notification = response.payload;
          return notification;
        })
      );
  }
  //api------------------------------------------------------------------------------
  public openNotificationChannel() {
    this.webSocket = new WebSocket('ws://localhost:8080/notification');

    this.webSocket.onopen = (event) => {
      console.log('Open:', event);
    };

    this.webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      let notification: Notification = message;
      this.userService.getUserInfo().subscribe((user: User) => {
        if (notification.receiverId === user.id) {
          if (notification.type === 'kick') {
            let refreshToken: RefreshToken = {
              refreshToken: user.refreshToken!,
            };
            this.authService.refreshToken(refreshToken).subscribe();
          }
          this.saveNotification(notification).subscribe((result) =>
            this.notifications.push(result)
          );
        }
      });
    };
    //---------------------------------------------------------
    this.getNotifications().subscribe((result) => {
      this.notifications = result;
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
