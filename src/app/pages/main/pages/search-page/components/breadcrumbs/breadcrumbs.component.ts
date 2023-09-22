import { Component, Input } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"],
})
export class BreadcrumbsComponent {
  breadcrumbs!: any[];
  @Input()
  breadcrumbsProps!: string[];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = [];
      console.log(this.route);
      // this.getBreadcrumbs(this.route.children);
      this.getBreadcrumbs(this.route.snapshot);
    });
  }

  // private getBreadcrumbs(data: ActivatedRoute[]) {
  private getBreadcrumbs(data: ActivatedRouteSnapshot) {
    // data.forEach((el: ActivatedRoute) => {
    // if (data.routeConfig && data.routeConfig.title && data.routeConfig.title === "string") {
    if (data.routeConfig && data.routeConfig.title) {
      console.log(data.routeConfig.title);

      this.breadcrumbs.push(data.routeConfig.title);
    }

    // })
    // data.routeConfig?.children?.forEach((el: Route) => {
    //   el;
    // });
  }
}
