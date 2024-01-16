// core-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes, NavigationEnd } from '@angular/router';
import { RegisterModule } from './register.module';
import { AuthGuard } from 'src/app/guard/auth.guard';

const coreRoutes: Routes = [
  {
    path: '', RegisterComponent
  },
  {
    path: 'movie/:id',
    loadChildren: () => import('./core.module').then(m => m.CoreModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(coreRoutes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
