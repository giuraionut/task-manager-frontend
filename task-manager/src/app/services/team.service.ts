import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/APIResponse.model';
import { Team } from '../models/Team.model';
import { take } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class TeamService {

  private url = 'http://localhost:8080/team';

  constructor(private http: HttpClient) {}

  public createTeam(team: Team): Observable<APIResponse> {
    return this.http
      .post<APIResponse>(`${this.url}`, team, { withCredentials: true })
      .pipe(take(1));
  }
  public deleteTeam(): Observable<APIResponse> {
    return this.http.delete<APIResponse>(`${this.url}` ,{ withCredentials: true }).pipe(take(1));
  }

  public getTeam(): Observable<APIResponse> {
      return this.http.get<APIResponse>(`${this.url}` , { withCredentials: true }).pipe(take(1));
  }

  public getTeamMembers(): Observable<APIResponse> {
      return this.http.get<APIResponse>(`${this.url}/teamMembers`, {withCredentials: true}).pipe(take(1));
  }
}

