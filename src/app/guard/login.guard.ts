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
        console.log('Logging In Status: ',this.userService.isLogged());
      if (state.url.includes('login') &&  this.userService.isLogged()) {
              // User is already logged in and trying to access the login page, redirect to home
              this.router.navigate(['/home']);
              alert('You are already logged in.')
              return false;
            }
        return true;
  }
}
