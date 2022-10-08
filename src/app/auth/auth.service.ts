import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPY5OBG7GJwNn68i-HSTtCvkbNn2tcFo4',
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }

  logIn() {}
}

interface AuthResData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
