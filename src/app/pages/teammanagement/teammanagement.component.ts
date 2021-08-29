import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/Team.model';
import { User } from '../../models/User.model';
import { TeamService } from '../../services/team.service';
import { NotificationSocketService } from '../../services/notificationWebSocket.service';
import { Notification } from '../../models/Notification.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../items/dialog/dialog.component';
import { AuthService } from '../../services/auth.service';
import { RefreshToken } from '../../models/RefreshToken.model';

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
    this.userService.getProfile().subscribe((response: User) => {
      this.leader = response;

      if (this.leader.teamId != null) {
        this.teamService.getTeam().subscribe((response: Team) => {
          this.team = response;
          
          if (this.team.authorId != this.leader.id) {
            this.router.navigate(['/taskmanager/mainpage']);
          }
        });

        this.teamService.getTeamMembers().subscribe((members) => {
          this.members = members;
        });
      } else {
        this.router.navigate(['/taskmanager/mainpage']);
      }
    });
  }

  public openInvitationDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        dialogType: 'invitation',
        leader: this.leader,
        team: this.team,
      },
    });
  }

  public deleteTeam() {
    let membersId: string[] = [];
    if(this.team.membersId)
    {
      membersId = this.team.membersId;
    }
    this.teamService.deleteTeam().subscribe(() => {
      membersId.forEach(memberId => {
        let notification: Notification = {};
        notification.content = 'Ai fost exclus din echipa';
        notification.receiverId = memberId;
        notification.senderId = this.leader.id;
        notification.senderAvatar = this.leader.avatar;
        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() + 3);
        notification.timestamp = timestamp;
  
        notification.type = 'kick';
  
        this.notificationSocketService.sendNotification(notification);
  
      });
      let refreshToken: RefreshToken = {
        refreshToken: this.leader.refreshToken!,
      };
      this.authService.refreshToken(refreshToken).subscribe();
      this.router.navigate(['/taskmanager/mainpage']);
    });
  }

  public uploadAvatar(event: any) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        dialogType: 'uploadimg',
        imgType: 'teamAvatar',
        image: event,
      },
    });
  }


}
