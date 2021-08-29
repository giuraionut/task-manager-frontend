import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { TeamService } from '../../services/team.service';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  constructor(
    public teamService: TeamService,
  ) {}

  @Input() management: Boolean = false;

  public team_panel_img = '../../assets/misc_images/team_panel.png';
  public members: Array<User> = [];

  ngOnInit(): void {
    this.teamService.getTeamMembers().subscribe((members: User[]) => {
      this.members = members;
    });
  }
}
