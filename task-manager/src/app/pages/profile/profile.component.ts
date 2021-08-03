import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from '../../models/APIResponse.model';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  public user: User = {};

  ngOnInit(): void {
    this.getUserInfo();
  }

  //------------------------------------------------------------------------------------------------
  public getUserInfo() {
    this.userService.getUserInfo().subscribe(
      (response: APIResponse) => {
        this.user = response.payload;
      },
      (error: HttpErrorResponse) => {
        console.log('Could not fetch user from backend');
        console.log(error);
      }
    );
  }

  public teamManagement()
  {
    this.router.navigate(["/taskmanager/teammanagement"]);
  }
}
