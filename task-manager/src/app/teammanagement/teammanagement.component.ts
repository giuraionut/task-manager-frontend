import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { APIResponse } from '../models/APIResponse.model';
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
  ngOnInit(): void {
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
