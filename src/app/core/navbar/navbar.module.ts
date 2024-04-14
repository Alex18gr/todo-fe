import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavItemComponent} from "./nav-item/nav-item.component";
import {NavbarComponent} from "./navbar.component";



@NgModule({
  declarations: [
    NavbarComponent,
    NavItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
