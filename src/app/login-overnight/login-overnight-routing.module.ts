import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginOvernightPage } from './login-overnight.page';

const routes: Routes = [
  {
    path: '',
    component: LoginOvernightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginOvernightPageRoutingModule {}
