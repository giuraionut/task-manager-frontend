import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class Guard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate() {
    let loggedIn = this.cookieService.get('loggedIn');
    if (loggedIn) {
      console.log('logged in');
      console.log(loggedIn);
      return true;
    }
    this.router.navigate(['taskmanager/home']);
    return false;
  }
}
