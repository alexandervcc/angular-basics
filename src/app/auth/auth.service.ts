import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthResData } from './AuthResData.mode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_KEY = 'AIzaSyDPY5OBG7GJwNn68i-HSTtCvkbNn2tcFo4';
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'Error: unknown error';
    if (!err.error || !err.error.error) {
      return throwError(errorMessage);
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Error: email already in use.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Error: password incorrect.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Error: password incorrect.';
        break;
    }
    return throwError(errorMessage);
  }
}
