import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { APIResponse } from '../../models/APIResponse.model';
import { Team } from '../../models/Team.model';
import { User } from '../../models/User.model';
import { TeamService } from '../../services/team.service';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  constructor(private teamService: TeamService) {}

  public team: Team = {};
  public user: User = {};
  public users: Array<User> = [];
  ngOnInit(): void {
    this.teamService.getTeam().subscribe(
      (response: APIResponse) => {
        this.team = response.payload;
        console.log('Team details obtained successfully');
        console.log(this.team);
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to obtain team details', error);
      }
    );

    this.teamService.getTeamMembers().subscribe(
      (response: APIResponse) => {
        this.users = response.payload;
        console.log('Team users obtained successfully');
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to obtain team members', error);
      }
    );
  }
}
