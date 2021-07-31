import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { APIResponse } from '../models/APIResponse.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = 'http://localhost:8080/user';

  constructor(private http: HttpClient, private router: Router) {}

  public getUserInfo() {
    return this.http.get(`${this.url}/profile`, {
      withCredentials: true,
    });
  }

  public signout() {
    let response: APIResponse;
    this.http
      .post(`${this.url}/signout`, null, { withCredentials: true })
      .subscribe(
        (result: any) => {
          localStorage.removeItem('loggedIn');
          this.router.navigate(['/taskmanager/home']);
          response = result;
          console.log(response);
        },
        (error: any) => {
          console.log('Sign out failed');
          console.log(error);
        }
      );
  }

  public register(user: User) {
    let response: APIResponse;
    this.http.post(`${this.url}/new`, user).subscribe(
      (result: any) => {
        response = result;
        console.log(response);
      },
      (error: any) => {
        console.log('Registration failed');
        console.log(error);
      }
    );
  }
}
