import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Notification } from '../../models/Notification.model';
import { NotificationSocketService } from '../../services/notificationWebSocket.service';
@Component({
  selector: 'app-notificationitem',
  templateUrl: './notificationitem.component.html',
  styleUrls: ['./notificationitem.component.scss'],
})
export class NotificationitemComponent implements OnInit {
  @Input() notifications: Array<Notification> = [];
  @Output() dismissedEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private notificationSocketService: NotificationSocketService) {}

  ngOnInit(): void {}

  public noNotif: Boolean = false;

  public dismissNotif(notification: Notification) {
    console.log(notification);
    this.notificationSocketService
      .deleteNotification(notification)
      .subscribe(() => {
        this.notifications = this.notifications.filter(
          (notif) => notif != notification
        );
        if (this.notifications.length == 0) {
          this.noNotif = true;
          this.dismissedEvent.emit();
        }
      });
  }

  public dismissAllNotif() {
    this.notifications.forEach((notification) => {
      this.dismissNotif(notification);
    });
    this.noNotif = true;
    this.dismissedEvent.emit();
  }
}
