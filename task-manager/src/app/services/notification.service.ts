import { Injectable } from '@angular/core';
import { Notification } from '../models/Notification.model';
import { User } from '../models/User.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  webSocket!: WebSocket;
  notification: Notification[] = [];
  received: Boolean[] = [];
  constructor(private userService: UserService) {}

  public openNotificationChannel() {
    this.webSocket = new WebSocket('ws://localhost:8080/notification');

    this.webSocket.onopen = (event) => {
      console.log('Open:', event);
    };

    this.webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      let notification: Notification = message;
      this.userService.getUserInfo().subscribe((result: User) => {
        if (notification.receiver === result.id)
          this.notification.push(notification);
      });
    };

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
