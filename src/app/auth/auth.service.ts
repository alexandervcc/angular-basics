import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { AuthResData } from '../models/AuthResData.model';
import { User } from '../models/User.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_KEY = 'AIzaSyDPY5OBG7GJwNn68i-HSTtCvkbNn2tcFo4';
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
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
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const newUser = new User(email, userId, token, expirationDate);
    this.user.next(newUser);
  }

  private handleError(err: HttpErrorResponse) {
    console.log('error: ', err);
    let errorMessage = 'Error: unknown error';
    if (!err.error || !err.error.error) {
      return throwError(errorMessage);
    }
    console.log('errorcode: ', err.error.error.message);
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
