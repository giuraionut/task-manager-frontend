import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private user: UserService, private router: Router) {}

  ngOnInit(): void {}

  public logout() {
    this.user.signout();
  }

  mobile: boolean = false;

  public accsettings() {
    this.router.navigate(['/taskmanager/settings']);
  }
}
