import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private url = 'http://localhost:8080/task';

  constructor(private http: HttpClient) {}

  public getTaskInfo(taskId: string) {
    return this.http.get(`${this.url}/details/${taskId}`, {
      withCredentials: true,
    });
  }


  public getPrivateTasks()
  {
    return this.http.get(`${this.url}/private`, {
      withCredentials: true,
    });
  }
}
