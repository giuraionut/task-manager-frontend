import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/Task.model';
import { APIResponse } from '../models/APIResponse.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private url = 'http://localhost:8080/task';

  constructor(private http: HttpClient) {}

  public getTaskInfo(taskId: string) {
    return this.http.get(`${this.url}/details/${taskId}`, {
      withCredentials: true,
    });
  }

  public getPrivateTasks(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.url}/private`, {
      withCredentials: true,
    });
  }

  public changeTaskStatus(task: Task): Observable<APIResponse> {
    return this.http.put<APIResponse>(
      `${this.url}/status/private/${task.id}`,
      null,
      {
        withCredentials: true,
      }
    );
  }

  public deleteTask(task: Task): Observable<APIResponse> {
    return this.http.delete<APIResponse>(
      `${this.url}/delete/private/${task.id}`,
      {
        withCredentials: true,
      }
    );
  }
}
