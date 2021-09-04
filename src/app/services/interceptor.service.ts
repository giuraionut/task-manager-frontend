import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APIResponse } from '../models/APIResponse.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let response: APIResponse = event.body;
          if (response.error === 'wrong credentials') {
            this.snackBar.open(
              'Autentificarea a esuat, verifica numele de utilizator si parola',
              'Close',
              { duration: 4000 }
            );
          }
          console.log(response.message);
          if (response.error !== 'none') {
            throw new Error(response.error);
          }
        }
        return event;
      }),
      catchError(() => [])
    );
  }
}
