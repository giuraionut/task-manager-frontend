import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { Team } from '../../models/Team.model';
import { TeamService } from '../../services/team.service';
import { AuthService } from '../../services/auth.service';
import { RefreshToken } from '../../models/RefreshToken.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../items/dialog/dialog.component';
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
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  public user: User = {};
  public hasTeam: Boolean = false;
  ngOnInit(): void {
    this.getUserInfo();
  }

  //------------------------------------------------------------------------------------------------
  public getUserInfo() {
    this.userService.getProfile().subscribe((user) => {
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
    let dialogRef = this.dialog.open(DialogComponent, { data: {dialogTitle: "Creaza o noua echipa", label: "Numele echipei", hint: "Introdu numele echipei"}});
    dialogRef.afterClosed().subscribe((result) => {
      if (result != 'false') {
        let team: Team = {};
        team.name = result;
        let refreshToken: RefreshToken = {
          refreshToken: this.user.refreshToken!,
        };
        this.teamService.createTeam(team).subscribe(() => {
          this.authService.refreshToken(refreshToken).subscribe();
          this.hasTeam = true;
        });
      } else {
        console.log('Team creation aborted');
      }
    });
  }
}
