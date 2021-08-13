import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {
  constructor(private userService: UserService) {}

  public hasTeam: boolean = false;
  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((user: User) => {
      if (user.teamId != null) {
        this.hasTeam = true;
      }
    });
  }
}
