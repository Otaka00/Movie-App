import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { UserService } from 'src/app/auth/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'IMDB';
  navbg:any;
   _routerUrl: string = '';

ngOnInit(): void {
//   if (!this.userService.isLogged()){
//     this.userService.isLoggingIn = false;
//   }
//   else  this.userService.isLoggingIn = true;
//   console.log("User session: ", this.userService.isLogged());
}

  get routerUrl(): string {
    return this._routerUrl;
  }
    logOut() {
      localStorage.clear();
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
