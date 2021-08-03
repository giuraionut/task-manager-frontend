import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { APIResponse } from '../models/APIResponse.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = 'http://localhost:8080/user';

  constructor(private http: HttpClient, private router: Router) {}

  public getUserInfo(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.url}/profile`, {
      withCredentials: true,
    });
  }

  public signout() {
    this.http
      .post<APIResponse>(`${this.url}/signout`, null, { withCredentials: true })
      .subscribe(
        (response: APIResponse) => {
          localStorage.removeItem('loggedIn');
          this.router.navigate(['/taskmanager/home']);
          console.log(response);
        },
        (error: any) => {
          console.log('Sign out failed');
          console.log(error);
        }
      );
  }

  public register(user: User) {
    this.http.post<APIResponse>(`${this.url}/new`, user).subscribe(
      (response: APIResponse) => {
        console.log('Registration successfully');
        console.log(response);
      },
      (error: any) => {
        console.log('Registration failed');
        console.log(error);
      }
    );
  }
}
