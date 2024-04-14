import {Component, Input, OnDestroy} from '@angular/core';
import {NavItemModel} from "../shared/nav-item-model.model";
import {Event, IsActiveMatchOptions, NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent implements OnDestroy {

  @Input() navItemData!: NavItemModel;
  subscriptions: Subscription[] = [];
  isActive: boolean = false;

  constructor(
    private router: Router,
  ) {
    this.subscriptions.push(
      router.events.subscribe((s: Event) => {
        if (s instanceof NavigationEnd) {
          this.checkRouterActive();
        }
      })
    );
    this.checkRouterActive();
  }

  callAction()  {
    this.navItemData.action();
  }

  checkRouterActive() {
    const options: IsActiveMatchOptions = {
      matrixParams: "exact",
      queryParams: "exact",
      paths: "exact",
      fragment: "exact"
    };
    this.isActive = this.navItemData ? this.router.isActive(this.router.createUrlTree(this.navItemData?.path), options) : false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
