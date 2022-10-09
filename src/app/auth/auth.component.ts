import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResData } from '../models/AuthResData.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error?: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitAuth(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }
    let authObservable: Observable<AuthResData>;
    const { email, password } = authForm.value;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this.authService.logIn(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(
      (resData) => {
        console.log('authRes: ', resData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    authObservable.subscribe();
    authForm.reset();
  }
}
