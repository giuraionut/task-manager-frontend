import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Notification } from '../../models/Notification.model';
import { User } from '../../models/User.model';
import { NotificationSocketService } from '../../services/notificationWebSocket.service';
import { TeamService } from '../../services/team.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { RefreshToken } from '../../models/RefreshToken.model';
import { NotificationService } from '../../services/notificationApi.service';
@Component({
  selector: 'app-notificationitem',
  templateUrl: './notificationitem.component.html',
  styleUrls: ['./notificationitem.component.scss'],
})
export class NotificationitemComponent implements OnInit {
  @Input() notifications: Array<Notification> = [];
  @Output() dismissedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public notificationSocketService: NotificationSocketService,
    private teamService: TeamService,
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  private user: User = {};
  ngOnInit(): void {
    this.userService.getProfile().subscribe((result) => {
      this.user = result;
    });
  }
  public dismissNotif(notification: Notification) {
    this.notificationService.deleteNotification(notification).subscribe(() => {
      this.notifications = this.notifications.filter(
        (notif) => notif != notification
      );
      this.notificationSocketService.notifications =
        this.notificationSocketService.notifications.filter(
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
  }

  public action(notification: Notification) {
    let teamId: string = notification.teamId!;

    this.teamService.acceptInvite(teamId).subscribe(() => {
      let refreshToken: RefreshToken = {
        refreshToken: this.user.refreshToken!,
      };

      this.authService.refreshToken(refreshToken).subscribe(() => {
        this.teamService.getTeamMembers().subscribe((members: Array<User>) => {
          let confirmation: Notification = {};
          confirmation.content = `${this.user.username} s-a alaturat echipei`;
          confirmation.senderId = notification.receiverId;
          confirmation.type = 'confirmation';

          const timestamp = new Date();
          timestamp.setHours(timestamp.getHours() + 3);
          confirmation.timestamp = timestamp;

          members.forEach((member) => {
            if (member.id != confirmation.senderId) {
              confirmation.receiverId = member.id;
              this.notificationSocketService.sendNotification(confirmation);
            }
          });
        });
      });
      this.dismissNotif(notification);
    });
  }
}
