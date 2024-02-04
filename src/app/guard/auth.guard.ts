import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/auth/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private userService: UserService, private router: Router) { }

       canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
         const isLoggedIn = this.userService.isLogged();

         if (!isLoggedIn) {
           this.router.navigate(['']);
           return false;
         }

         return true;
       }

//   constructor(private userService: UserService, private router: Router) {}
//
//   canActivate(
//     route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
//      {
//         console.log('Logging In Status: ',this.userService.isLogging());
//         if (!this.userService.isLogging() && localStorage.length === 0) {
//           // Redirect to the login page if the user is not logged in
//           this.router.navigate(['']);
//           return false;
//         }
//         else if (state.url.includes('login') && this.userService.isLogging()) {
//               // User is already logged in and trying to access the login page, redirect to home
//               this.router.navigate(['/home']);
//               return true;
//             }
//         return true;
//   }
}
