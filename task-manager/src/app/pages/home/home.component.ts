import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormControl, Validators } from '@angular/forms';
interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private user: UserService,
    private auth: AuthService,
    private router: Router
  ) {}

  genders: Gender[] = [
    { value: 'male', viewValue: 'Masculin' },
    { value: 'female', viewValue: 'Feminin' },
  ];

  ngOnInit(): void {
    let loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn) {
      if (JSON.parse(loggedIn)) {
        this.router.navigate(['/taskmanager/mainpage']);
      }
    }
  }

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public reg: boolean = true;

  public register(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    birthDate: string
  ) {
    if (this.reg) {
      let user: User = {
        username,
        password,
        email,
        firstName,
        lastName,
        gender,
        birthDate,
      };
      this.user.register(user);
      this.reg = false;
    }
  }

  public login(username: string, password: string) {
    let user: User = { username, password };
    this.auth.login(user);
  }
}
