import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { TeamService } from '../../services/team.service';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  constructor(private teamService: TeamService) {}

  public users: Array<User> = [];
  ngOnInit(): void {
    this.teamService.getTeamMembers().subscribe((response) => {
      this.users = response;
    });
  }
}
