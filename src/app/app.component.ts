import { Component,HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { UserService } from 'src/app/pages/auth/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'IMDB';
  navbg:any;
   _routerUrl: string = '';

  get routerUrl(): string {
    return this._routerUrl;
  }
    logOut() {
      sessionStorage.clear();
      this.router.navigate(['']);
      this.userService.logoutUser();
    }

    isLoginRoute: boolean = false;
    constructor(private router: Router, private authGuard: AuthGuard, private userService: UserService) {
      // Subscribe to router events to detect route changes
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd){
          // Update isLoginRoute based on the current route
              this._routerUrl = event.url;
              this.isLoginRoute = this._routerUrl.includes('home') || this._routerUrl.includes('movie');
              this.userService.isLoggingIn = true;
}
      });
    }
  @HostListener('document:scroll') scrollover(){
    console.log(document.body.scrollTop,'scrolllength#');

    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)
        this.navbg = {'background-color':'#ffff00'}
    else this.navbg = { 'background-color':'#ffff00'}
   }
}
