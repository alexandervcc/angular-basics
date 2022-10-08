import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitAuth(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }
    const { email, password } = authForm.value;
    if (this.isLoginMode) {
      //xd
    } else {
      this.authService.signUp(email, password).subscribe(
        (resData) => {
          console.log('authRes: ', resData);
        },
        (err) => {
          console.log('AuthError: ', err);
        }
      );
    }

    authForm.reset();
  }
}
