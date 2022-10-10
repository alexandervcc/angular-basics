import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResData } from '../models/AuthResData.model';
import { Router } from '@angular/router';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error?: string;

  //This will get the first ocurrence of an element in DOM
  @ViewChild(PlaceHolderDirective) alertHost?: PlaceHolderDirective;
  private modalSub?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.showErrorModal(errorMessage);
        this.isLoading = false;
      }
    );
    authObservable.subscribe();
    authForm.reset();
  }

  onHandleModal() {
    this.error = undefined;
  }

  //rendering dynamic content programatically
  private showErrorModal(errorMessage: string) {
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost?.viewContainerRef;

    //clear whatever was rendered before
    hostViewContainerRef?.clear();

    const alertCmpRef = hostViewContainerRef?.createComponent(alertCmpFactory);

    //adding data to Cmp
    alertCmpRef!!.instance.message = errorMessage;
    this.modalSub = alertCmpRef!!.instance.close.subscribe(() => {
      this.modalSub?.unsubscribe();
      hostViewContainerRef?.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.modalSub) {
      this.modalSub.unsubscribe();
    }
  }
}

/*
  - In order to create components programatically the 'ComponentFactoryResolver'
    - not that it is not supporte in actual versions on Angular
  
  - to attach it into the dom the html requires a viewContainerRef

  - in order to inject data into the component a ref to it is required
*/
