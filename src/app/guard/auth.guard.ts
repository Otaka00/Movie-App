import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/auth/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
     {
        console.log('Logging In Status: ',this.userService.isLogging());
        if (!this.userService.isLogging()) {
          // Redirect to the login page if the user is not logged in
          this.router.navigate(['']);
          return false;
        }
         return true;
  }
}
