import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { stringValidator } from '../../directives/formvalidator.directive';
import { DialogComponent } from '../../items/dialog/dialog.component';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-updateuserinfo',
  templateUrl: './updateuserinfo.component.html',
  styleUrls: ['./updateuserinfo.component.scss'],
})
export class UpdateuserinfoComponent implements OnInit {
  @Output() updateView = new EventEmitter();
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  public user: User = {};
  ngOnInit(): void {
    this.userService.getProfile().subscribe((user: User) => {
      this.user = user;
    });
  }
  public hide = true;

  emailControl = new FormControl('', [Validators.email]);
  usernameControl = new FormControl('', [
    Validators.minLength(5),
    stringValidator(/bob/),
  ]);
  passwordControl = new FormControl('', [
    Validators.minLength(8),
    Validators.pattern(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
    ),
  ]);

  getErrorMessage(field: string): string {
    switch (field) {
      case 'username': {
        if (this.usernameControl.hasError('string')) {
          return 'Numele de utilizator nu este valid.';
        }
        if (this.usernameControl.hasError('minlength')) {
          return 'Lungimea minima este de  5 caractere.';
        }
        break;
      }
      case 'email': {
        if (this.emailControl.hasError('email')) {
          return 'Adresa de email este incorecta.';
        }
        break;
      }
      case 'password': {
        if (this.passwordControl.hasError('pattern')) {
          return 'Trebuie sa contina o majuscula, un caracter special si minim 8 caractere.';
        }
        break;
      }
    }
    return 'Ok';
  }

  public uploadAvatar(event: any) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        dialogType: 'uploadimg',
        imgType: 'userAvatar',
        image: event,
      },
    });
  }

  public updateUser(
    username: string,
    password: string,
    email: string,
    aboutMe: string
  ) {
    let user: User = {};
    user.username = username;
    user.password = password;
    user.email = email;
    user.aboutMe = aboutMe;
    this.userService.updateUser(user).subscribe(() => {
      this.snackBar.open('Datele au fost actualizate cu success', 'Close', {
        duration: 4000,
      });
      this.updateView.emit(true);
    });
  }
}
