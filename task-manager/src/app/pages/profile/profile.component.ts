import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { Team } from '../../models/Team.model';
import { TeamService } from '../../services/team.service';
import { AuthService } from '../../services/auth.service';
import { RefreshToken } from '../../models/RefreshToken.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private teamService: TeamService,
    private authService: AuthService
  ) {}

  public user: User = {};
  public hasTeam: Boolean = false;
  ngOnInit(): void {
    this.getUserInfo();
  }

  //------------------------------------------------------------------------------------------------
  public getUserInfo() {
    this.userService.getUserInfo().subscribe((user) => {
      this.user = user;
      if (this.user.teamId != null) {
        this.hasTeam = true;
      }
    });
  }

  public teamManagement() {
    this.router.navigate(['/taskmanager/teammanagement']);
  }

  public createTeam() {
    let team: Team = {};
    team.name = 'Echipa mea';
    let refreshToken: RefreshToken = { refreshToken: this.user.refreshToken! };
    this.teamService.createTeam(team).subscribe();
    this.authService.refreshToken(refreshToken).subscribe();
  }
}
