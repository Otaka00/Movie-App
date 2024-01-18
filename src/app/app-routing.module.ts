  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { HomeComponent } from './core/home/home.component';
  import { MovieDetailsComponent } from './core/movie-details/movie-details.component';
  import { LoginComponent } from './auth/login/login.component';
  import { RegisterComponent } from './auth/register/register.component';
  import { AuthGuard } from 'src/app/guard/auth.guard'
  import { LoginGuard } from 'src/app/guard/login.guard'

  const routes: Routes = [
    {path:'login', component:LoginComponent,canActivate: [LoginGuard] },

    {path: 'home', component:HomeComponent, canActivate: [AuthGuard] },
    { path:'movie/:id', component:MovieDetailsComponent,canActivate: [AuthGuard] },
    {path:'register', component:RegisterComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
