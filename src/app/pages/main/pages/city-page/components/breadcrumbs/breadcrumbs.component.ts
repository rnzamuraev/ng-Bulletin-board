import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IBreadcrumbs } from "src/app/shared/types/breadcrumbs.interface";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"],
})
export class BreadcrumbsComponent {
  // breadcrumbs!: any[];
  @Input()
  breadcrumbsProps!: IBreadcrumbs[];

  @Input()
  isProductInfoProps!: boolean;

  @Output()
  linkBreadcrumbs = new EventEmitter<IBreadcrumbs | null>();

  onGoTo(obj: IBreadcrumbs | null) {
    // this.breadcrumbsProps = this.breadcrumbsProps.filter(
    //   el => el.link.split("/").slice(-2, -1)[0] !== "ad"
    // );
    console.log(obj);
    console.log(this.breadcrumbsProps);
    this.linkBreadcrumbs.emit(obj);
  }

  // constructor(private route: ActivatedRoute, private router: Router) {
  //   this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
  //     this.breadcrumbs = [];
  //     console.log(this.route);
  //     // this.getBreadcrumbs(this.route.children);
  //     this.getBreadcrumbs(this.route.snapshot);
  //   });
  // }

  // // private getBreadcrumbs(data: ActivatedRoute[]) {
  // private getBreadcrumbs(data: ActivatedRouteSnapshot) {
  //   // data.forEach((el: ActivatedRoute) => {
  //   // if (data.routeConfig && data.routeConfig.title && data.routeConfig.title === "string") {
  //   if (data.routeConfig && data.routeConfig.title) {
  //     console.log(data.routeConfig.title);

  //     this.breadcrumbs.push(data.routeConfig.title);
  //   }

  //   // })
  //   // data.routeConfig?.children?.forEach((el: Route) => {
  //   //   el;
  //   // });
  // }
}
