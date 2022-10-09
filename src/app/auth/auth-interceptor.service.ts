import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user.token) {
          return next.handle(req);
        }
        const token = user.token ? user.token : 'NULL';
        const reqClone = req.clone({
          params: new HttpParams().set('auth', token),
        });
        return next.handle(reqClone);
      })
    );
  }
}

/*
  - The interceptor will inject the token for each Http Request
  
    take: get just one value, then unsubscribe
    when you dont want an ongoing subscription
    exhaustMap: wait for the first observable to complete,
    then return a new to replace the previous one

*/
