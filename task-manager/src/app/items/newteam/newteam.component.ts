import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../models/Team.model';
import { TeamService } from '../../services/team.service';
import { AuthService } from '../../services/auth.service';
import { RefreshToken } from '../../models/RefreshToken.model';
@Component({
  selector: 'app-newteam',
  templateUrl: './newteam.component.html',
  styleUrls: ['./newteam.component.scss'],
})
export class NewteamComponent implements OnInit {
  @Input() data: any;
  constructor(
    private teamService: TeamService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  public createTeam(teamName: string) {
    let team: Team = {};
    team.authorId = this.data.leader.id;
    team.name = teamName;
    this.teamService.createTeam(team).subscribe(() => {
      let refreshToken: RefreshToken = { refreshToken: this.data.refreshToken };

      this.authService.refreshToken(refreshToken).subscribe();
    });
  }
}
