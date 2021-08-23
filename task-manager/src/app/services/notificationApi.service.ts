import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponse } from '../models/APIResponse.model';
import { Notification } from '../models/Notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  notifications: Notification[] = [];
  private url = 'http://localhost:8080/notification/api';

  constructor(private http: HttpClient) {}

  public saveNotification(notification: Notification): Observable<Notification> {
    return this.http
      .post<APIResponse>(`${this.url}`, notification, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let notification: Notification = response.payload;
          return notification;
        })
      );
  }

  public getNotifications(): Observable<Array<Notification>> {
    return this.http
      .get<APIResponse>(`${this.url}`, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let notifications: Array<Notification> = response.payload;
          return notifications;
        })
      );
  }

  public deleteNotification(notification: Notification): Observable<Notification> {
    return this.http
      .delete<APIResponse>(`${this.url}`, {
        body: notification,
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let notification: Notification = response.payload;
          return notification;
        })
      );
  }
}
