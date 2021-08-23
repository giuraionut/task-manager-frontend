import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { APIResponse } from '../models/APIResponse.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RefreshToken } from '../models/RefreshToken.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {}

  public login(user: User): void {
    this.http
      .post<APIResponse>(`${this.url}/login`, user, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          localStorage.setItem('loggedIn', 'true');
          this.router.navigate(['/taskmanager/mainpage']);
        })
      )
      .subscribe();
  }

  public refreshToken(refreshToken: RefreshToken): Observable<void> {
    return this.http
      .post<APIResponse>(`${this.url}/token/refresh`, refreshToken, {
        withCredentials: true,
      })
      .pipe(map((result: APIResponse) => {}));
  }
}
