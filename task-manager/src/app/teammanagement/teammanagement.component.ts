import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { APIResponse } from '../models/APIResponse.model';
import { Team } from '../models/Team.model';
import { User } from '../models/User.model';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-teammanagement',
  templateUrl: './teammanagement.component.html',
  styleUrls: ['./teammanagement.component.scss'],
})
export class TeammanagementComponent implements OnInit {
  constructor(private teamService: TeamService) {}

  public users: Array<User> = [];
  public team: Team = {};
  ngOnInit(): void {
    this.teamService.getTeam().subscribe((response) => {
      this.team = response;
    });

    this.teamService.getTeamMembers().subscribe((response) => {
      this.users = response;
    });
  }
}
