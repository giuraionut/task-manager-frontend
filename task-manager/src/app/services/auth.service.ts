import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { APIResponse } from '../models/APIResponse.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {}

  public login(user: User) {
    let response: APIResponse;
    this.http
      .post(`${this.url}/login`, user, { withCredentials: true })
      .subscribe(
        (result: any) => {
          localStorage.setItem('loggedIn', 'true');
          this.router.navigate(['/taskmanager/mainpage']);
          response = result;
          console.log(response);
        },
        (error: any) => {
          console.log('Login failed');
          console.log(error);
        }
      );
  }
}
