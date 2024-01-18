import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/auth/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
     {
        console.log('Logging In Status: ',this.userService.isLogging());
      if (state.url.includes('login') &&  localStorage.length != 0) {
              // User is already logged in and trying to access the login page, redirect to home
              this.router.navigate(['/home']);
              return false;
            }
        return true;
  }
}
