import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { APIResponse } from '../models/APIResponse.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = 'http://localhost:8080/user';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

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

  public uploadAvatar(image: FormData): Observable<void> {
    return this.http
      .put<APIResponse>(`${this.url}/avatar`, image, { withCredentials: true })
      .pipe(map(() => {}));
  }

  public signout(): void {
    this.http
      .post<APIResponse>(`${this.url}/signout`, null, { withCredentials: true })
      .pipe(
        map(() => {
          this.cookieService.delete('loggedIn');
          this.router.navigate(['/taskmanager/home']);
        })
      )
      .subscribe();
  }

  public register(user: User): Observable<String> {
    return this.http.post<String>(`${this.url}/new`, user).pipe(
      map((response: String) => {
        return response;
      })
    );
  }

  public updateUser(user: User): Observable<void> {
    return this.http
      .put<APIResponse>(`${this.url}/update`, user, { withCredentials: true })
      .pipe(map((response: APIResponse) => {}));
  }

}
