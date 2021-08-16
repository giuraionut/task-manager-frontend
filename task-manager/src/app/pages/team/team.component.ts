import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { TeamService } from '../../services/team.service';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  constructor(public teamService: TeamService) {}

  public members: Array<User> = [];
  ngOnInit(): void {
    this.teamService.getTeamMembers().subscribe(members => {
      this.members = members;
    });
  }
}
