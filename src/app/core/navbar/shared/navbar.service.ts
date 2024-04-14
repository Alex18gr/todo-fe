import { Injectable } from '@angular/core';
import {NavItemModel} from "./nav-item-model.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(
    private router: Router
  ) { }

  private _navItems: NavItemModel[] = [
    {
      label: 'Todo List',
      path: [''],
      action: () => {
        this.router.navigate(['']);
      }
    },
    {
      label: 'Categories',
      path: ['categories'],
      action: () => {
        this.router.navigate(['categories']);
      }
    }
  ];

  get navItems(): NavItemModel[] {
    return this._navItems;
  }
}
