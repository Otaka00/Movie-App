// core-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes, NavigationEnd } from '@angular/router';
import { CoreModule } from './core.module';
import { AuthGuard } from 'src/app/guards/auth.guard';

const coreRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./core.module').then(m => m.CoreModule),
    canActivate: [AuthGuard],
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
export class CoreRoutingModule {}
