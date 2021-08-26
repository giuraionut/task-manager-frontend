import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { APIResponse } from '../models/APIResponse.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = 'http://localhost:8080/user';

  constructor(private http: HttpClient, private router: Router) {}

  public getProfile(): Observable<User> {
    return this.http
      .get<APIResponse>(`${this.url}/profile`, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          return response.payload;
        })
      );
  }

  public getUserInfo(userId: string): Observable<User> {
    return this.http
      .get<APIResponse>(`${this.url}/${userId}`, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          return response.payload;
        })
      );
  }

  public signout(): void {
    this.http
      .post<APIResponse>(`${this.url}/signout`, null, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          localStorage.removeItem('loggedIn');
          this.router.navigate(['/taskmanager/home']);
          console.log(response.message);
        })
      )
      .subscribe();
  }

  public register(user: User): void {
    this.http
      .post<APIResponse>(`${this.url}/new`, user)
      .pipe(
        map((response: APIResponse) => {
          throw new Error(response.error);
        })
      )
      .subscribe();
  }
}
