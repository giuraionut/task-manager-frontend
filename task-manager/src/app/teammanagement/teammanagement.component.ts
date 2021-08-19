import { Component, OnInit } from '@angular/core';
import { Team } from '../models/Team.model';
import { User } from '../models/User.model';
import { TeamService } from '../services/team.service';
import { NotificationSocketService } from '../services/notificationWebSocket.service';
import { Notification } from '../models/Notification.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../items/dialog/dialog.component';
import { AuthService } from '../services/auth.service';
import { RefreshToken } from '../models/RefreshToken.model';

@Component({
  selector: 'app-teammanagement',
  templateUrl: './teammanagement.component.html',
  styleUrls: ['./teammanagement.component.scss'],
})
export class TeammanagementComponent implements OnInit {
  constructor(
    private teamService: TeamService,
    private userService: UserService,
    public notificationSocketService: NotificationSocketService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  public members: Array<User> = [];
  public team: Team = {};
  public leader: User = {};
  ngOnInit(): void {
    this.userService.getProfile().subscribe((response) => {
      this.leader = response;

      if (this.leader.teamId != null) {
        this.teamService.getTeam().subscribe((response) => {
          this.team = response;
        });

        this.teamService.getTeamMembers().subscribe((members) => {
          this.members = members;
        });
      } else {
        this.router.navigate(['/taskmanager/mainpage']);
      }
    });
  }

  public sendInvitation() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        dialogType: 'invitation',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'false') {
        let notification: Notification = {};
        notification.content = `${this.leader.username} te invita in "${this.team.name}"`;
        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() + 3);
        notification.timestamp = timestamp;
        notification.receiverId = result;
        notification.senderId = this.leader.id;
        notification.teamId = this.leader.teamId;
        notification.type = 'invitation';
        this.notificationSocketService.sendNotification(notification);
      } else {
        console.log('User aborted');
      }
    });
  }

  public deleteTeam() {
    this.teamService.deleteTeam().subscribe(() => {
      let refreshToken: RefreshToken = {
        refreshToken: this.leader.refreshToken!,
      };
      this.authService.refreshToken(refreshToken).subscribe();
      this.router.navigate(['/taskmanager/mainpage']);
    });
  }
}
