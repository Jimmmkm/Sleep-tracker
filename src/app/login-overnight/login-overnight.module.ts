import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginOvernightPageRoutingModule } from './login-overnight-routing.module';

import { LoginOvernightPage } from './login-overnight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginOvernightPageRoutingModule
  ],
  declarations: [LoginOvernightPage]
})
export class LoginOvernightPageModule {}
