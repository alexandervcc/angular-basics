import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      //in order to just get once, and dont have an ongoing listener
      take(1),
      map((user) => {
        const isAuth = !!user.token;
        if (isAuth) {
          return true;
        }
        //this one will manage the navigation
        return this.router.createUrlTree(['/auth']);
      })
      /*  THIS aproach could generate race conditions
      ,tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/auth']);
        }
      }) */
    );
  }
}

/*
  - Guard
    - a code that is run before rendering an URL
*/
