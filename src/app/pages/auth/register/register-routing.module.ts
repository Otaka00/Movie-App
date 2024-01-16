// core-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes, NavigationEnd } from '@angular/router';
import { RegisterModule } from './register.module';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RegisterComponent } from './register.component';

const coreRoutes: Routes = [
  {
    path: '', RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(coreRoutes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
