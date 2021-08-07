import { Component, OnInit } from '@angular/core';
import { Team } from '../models/Team.model';
import { User } from '../models/User.model';
import { TeamService } from '../services/team.service';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/Notification.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-teammanagement',
  templateUrl: './teammanagement.component.html',
  styleUrls: ['./teammanagement.component.scss'],
})
export class TeammanagementComponent implements OnInit {
  constructor(
    private teamService: TeamService,
    private userService: UserService,
    public notificationService: NotificationService
  ) {}

  public users: Array<User> = [];
  public team: Team = {};
  public leader: User = {};
  ngOnInit(): void {
    this.teamService.getTeam().subscribe((response) => {
      this.team = response;
    });

    this.teamService.getTeamMembers().subscribe((response) => {
      this.users = response;
    });
    this.userService.getUserInfo().subscribe(response => {
      this.leader = response;
    })
  }

  public sendInvitation(receiver: string) {
    let notification: Notification = {};
    notification.content = 'Esti invitat in ' + `"${this.team.name}"`;
    notification.timestamp = new Date();
    notification.receiver = receiver;
    notification.stateRead = false;
    notification.sender = this.leader.username;
    this.notificationService.sendNotification(notification);
  }

  public viewUsers() {
    console.log('ok');
  }
}
