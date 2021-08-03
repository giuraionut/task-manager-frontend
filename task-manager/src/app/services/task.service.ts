import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task.model';
import { APIResponse } from '../models/APIResponse.model';
import { take } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class TaskService {
  
  private url = 'http://localhost:8080/task';

  constructor(private http: HttpClient) {}

  public countPublicTasks(type: string, state: string): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.url}/quantity/${type}/${state}`, {
      withCredentials: true,
    });
  }
  public getTasks(type: string): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.url}/${type}`, {
      withCredentials: true
    }).pipe(take(1));
  }
  public editTask(task: Task): Observable<APIResponse> {
    return this.http.put<APIResponse>(`${this.url}/private`, task, {
      withCredentials: true
    }).pipe(take(1));
  }

  public deleteTask(task: Task): Observable<APIResponse> {
    return this.http.delete<APIResponse>(`${this.url}/private`, {
      withCredentials: true,
      body: task,
    }).pipe(take(1));
  }

  public newTask(task: Task): Observable<APIResponse>
  {
    return this.http.post<APIResponse>(`${this.url}/private`, task, {withCredentials:true});
  }
}
