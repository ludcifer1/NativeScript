import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    console.log('>>>> Guard Run <<<<');

    // process if login true or fail
    return this.loginService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) {
        console.log('>>>> Guard Passed <<<<');
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    });
  }
}
