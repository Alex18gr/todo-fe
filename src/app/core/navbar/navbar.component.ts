import { Component } from '@angular/core';
import {NavItemComponent} from "./nav-item/nav-item.component";
import {NavbarService} from "./shared/navbar.service";
import {NavItemModel} from "./shared/nav-item-model.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  navItems: NavItemModel[];

  constructor(
    private navbarService: NavbarService,
  ) {
    this.navItems = this.navbarService.navItems;
  }

}
