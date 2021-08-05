import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task.model';
import { APIResponse } from '../models/APIResponse.model';
import { map, take } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class TaskService {
  private url = 'http://localhost:8080/task';

  constructor(private http: HttpClient) {}

  public countPublicTasks(type: string, state: string): Observable<number> {
    return this.http
      .get<APIResponse>(`${this.url}/quantity/${type}/${state}`, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let quantity = response.payload;
          return quantity;
        })
      );
  }
  public getTasks(type: string): Observable<Array<Task>> {
    return this.http
      .get<APIResponse>(`${this.url}/${type}`, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let tasks: Array<Task> = [...response.payload];
          return tasks;
        })
      );
  }
  public editTask(task: Task): Observable<APIResponse> {
    return this.http
      .put<APIResponse>(`${this.url}/private`, task, {
        withCredentials: true,
      })
      .pipe(take(1));
  }

  public deleteTask(task: Task): Observable<APIResponse> {
    return this.http
      .delete<APIResponse>(`${this.url}/private`, {
        withCredentials: true,
        body: task,
      })
      .pipe(take(1));
  }

  public newTask(task: Task): Observable<Task> {
    return this.http
      .post<APIResponse>(`${this.url}/private`, task, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let task: Task = response.payload;
          return task;
        })
      );
  }
}
