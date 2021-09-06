import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../items/dialog/dialog.component';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/Team.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() events: Observable<void> = new Observable<void>();
  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private teamService: TeamService
  ) {}

  public user: User = {};
  public isTeamLeader: Boolean = false;
  public hasTeam: Boolean = false;
  ngOnInit(): void {
    this.getUserInfo();
    this.events.subscribe(() => {
      this.getUserInfo();
    });
  }

  //------------------------------------------------------------------------------------------------
  public getUserInfo() {
    this.userService.getProfile().subscribe((user) => {
      this.user = user;
      if (this.user.teamId != null) {
        this.hasTeam = true;
      }
      if (this.hasTeam) {
        this.teamService.getTeam().subscribe((team: Team) => {
          if (this.user.id === team.authorId) {
            this.isTeamLeader = true;
          }
        });
      }
    });
  }

  public teamManagement() {
    this.router.navigate(['/taskmanager/teammanagement']);
  }

  public createTeam() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        dialogType: 'newteam',
        leader: this.user,
        refreshToken: this.user.refreshToken,
      },
    });
  }
}
