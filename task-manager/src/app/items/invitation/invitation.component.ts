import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../models/Notification.model';
import { NotificationSocketService } from '../../services/notificationWebSocket.service';
@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
})
export class InvitationComponent implements OnInit {
  @Input() data: any;
  constructor(public notificationSocketService: NotificationSocketService) {}

  ngOnInit(): void {}

  public sendInvitation(userId: string) {
    let notification: Notification = {};
    notification.content = `${this.data.leader.username} te invita in "${this.data.team.name}"`;
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() + 3);
    notification.timestamp = timestamp;
    notification.receiverId = userId;
    notification.senderId = this.data.leader.id;
    notification.teamId = this.data.team.id;
    notification.type = 'invitation';
    this.notificationSocketService.sendNotification(notification);
  }
}
