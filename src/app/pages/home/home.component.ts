import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { stringValidator } from '../../directives/formvalidator.directive';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private cookieService: CookieService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  public hide = true;
  genders: Gender[] = [
    { value: 'male', viewValue: 'Masculin' },
    { value: 'female', viewValue: 'Feminin' },
  ];

  ngOnInit(): void {
    let loggedIn = this.cookieService.get('loggedIn');
    if (loggedIn) {
      this.router.navigate(['taskmanager/mainpage']);
    }
  }
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  usernameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    stringValidator(/bob/),
  ]);
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
    ),
  ]);

  getErrorMessage(field: string): string {
    switch (field) {
      case 'username': {
        if (this.usernameControl.hasError('required')) {
          return 'Numele de utilizator trebuie sa contina minim 5 caractere.';
        }
        if (this.usernameControl.hasError('string')) {
          return 'Numele de utilizator nu este valid.';
        }
        if (this.usernameControl.hasError('minlength')) {
          return 'Lungimea minima este de  5 caractere.';
        }
        break;
      }
      case 'email': {
        if (this.emailControl.hasError('required')) {
          return 'Adresa de email este obligatorie.';
        }
        if (this.emailControl.hasError('email')) {
          return 'Adresa de email nu este obligatorie.';
        }
        break;
      }
      case 'password': {
        if (this.passwordControl.hasError('required')) {
          return 'Parola este obligatorie.';
        }
        if (this.passwordControl.hasError('pattern')) {
          return 'Trebuie sa contina o majuscula, un caracter special si minim 8 caractere.';
        }
        break;
      }
    }
    return 'Ok';
  }

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
    if (this.reg && !this.emailControl.invalid && !this.passwordControl.invalid && !this.usernameControl.invalid) {
      let user: User = {
        username,
        password,
        email,
        firstName,
        lastName,
        gender,
        birthDate,
      };
      this.user.register(user).subscribe((response: String) => {
        if (response !== 'none') {
          this.reg = false;
        }
      });
    }
    else{
      this.snackBar.open('Verifica inca odata datele introduse', 'Close', {duration:4000});
    }
  }

  public login(username: string, password: string) {
    let user: User = { username, password };
    this.auth.login(user);
  }
}
