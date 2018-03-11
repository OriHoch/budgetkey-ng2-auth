import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";

import { AuthComponent } from './components/AuthComponent';
import {
  AuthService, getAuthServiceConfigProvider, ListManagementService, getListManagementServiceConfigProvider
} from "./services";

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    AuthComponent
  ],
  exports: [
    AuthComponent
  ],
  providers: [
    // getAuthServiceConfigProvider('https://next.obudget.org'),
    getAuthServiceConfigProvider('https://localhost:8001'),
    getListManagementServiceConfigProvider('https://localhost:8001'),
    AuthService, ListManagementService
  ]
})
export class AuthModule { }
