import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Notification } from '../../models/Notification.model';
import { NotificationSocketService } from '../../services/notificationWebSocket.service';
import { TeamService } from '../../services/team.service';
@Component({
  selector: 'app-notificationitem',
  templateUrl: './notificationitem.component.html',
  styleUrls: ['./notificationitem.component.scss'],
})
export class NotificationitemComponent implements OnInit {
  @Input() notifications: Array<Notification> = [];
  @Output() dismissedEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private notificationSocketService: NotificationSocketService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {}

  public dismissNotif(notification: Notification) {
    console.log(notification);
    this.notificationSocketService
      .deleteNotification(notification)
      .subscribe(() => {
        this.notifications = this.notifications.filter(
          (notif) => notif != notification
        );
        if (this.notifications.length == 0) {
          this.dismissedEvent.emit(true);
        }
      });
  }

  public dismissAllNotif() {
    this.notifications.forEach((notification) => {
      this.dismissNotif(notification);
    });

    this.dismissedEvent.emit(true);
  }

  public action(notification: Notification) {
    let teamId: string = notification.teamId!;
    this.teamService.acceptInvite(teamId).subscribe(() => {
      let confirmation: Notification = {};
      confirmation.content = 'User accepted your invite';
      confirmation.receiverId = notification.senderId;
      confirmation.senderId = notification.receiverId;
      confirmation.type = 'Confirmation';
      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() + 3);
      notification.timestamp = timestamp;

      this.notificationSocketService.sendNotification(confirmation);
    });
    this.dismissNotif(notification);
  }
}
