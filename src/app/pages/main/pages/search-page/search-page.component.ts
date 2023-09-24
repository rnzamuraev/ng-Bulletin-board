import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

import { Subscription, filter } from "rxjs";
import { IBreadcrumbs } from "src/app/pages/main/types/breadcrumbs.interface";
import { ICategories } from "src/app/pages/main/types/categories.interface";
import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { ICategoryMenu } from "src/app/shared/types/category.interface";
import { IProduct } from "src/app/shared/types/products.interface";
import { EStaticVar } from "src/app/shared/types/staticVar.enum";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.scss"],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  private unSubscribeCategories!: Subscription;
  // private unSubscribeBreadcrumbs!: Subscription;
  // private city = "Севастополь";

  isProductInfo = false;
  products!: IProduct[];
  categories!: ICategoryMenu[];
  breadcrumbs!: IBreadcrumbs[];
  // routerLinks!: string[];
  titlePage!: string;
  searchText!: string;

  constructor(
    private categoryService: CategoryService,
    // private activatedRoute: ActivatedRoute
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.initializeRouterEvents();
    // this.getBreadcrumbs$();
    this.getProducts();
  }

  private getCategory(): void {
    this.unSubscribeCategories = this.categoryService
      .getCategory()
      .subscribe((data: ICategoryMenu[]) => {
        console.log(data);
        this.categories = data;

        this.setBreadcrumbs(data);
      });
  }
  private initializeRouterEvents() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      //     this.breadcrumbs = [];
      //     console.log(this.route);
      //     // this.getBreadcrumbs(this.route.children);
      //     this.getBreadcrumbs(this.route.snapshot);
      this.setBreadcrumbs(this.categories);
    });
  }

  //** Get Url */
  private getUrlParams(): string {
    console.log(this.router.routerState.snapshot.url);

    return this.router.routerState.snapshot.url;
  }
  //** Url => string[] */
  private getRoutes(str: string): string[] {
    if (str.split("/").length >= EStaticVar.ROUTES_LENGTH_PRODUCT_PAGE) {
      this.isProductInfo = true;
    }
    return str.split("/").slice(2);
  }

  //** Set Breadcrumbs on page load */
  private setBreadcrumbs(data: ICategoryMenu[]): void {
    let i = 0;
    this.getBreadcrumbsLinks(this.getRoutes(this.getUrlParams()));
    this.getBreadcrumbsLabel(i, data);
    console.log(this.breadcrumbs);
  }
  //** Get BreadcrumbsLinks */
  private getBreadcrumbsLinks(routes: string[]): void {
    this.breadcrumbs = [];
    console.log(routes);
    let link = "sevastopol";
    routes.forEach((elem: string, i: number) => {
      const obj = {
        label: "",
        link: "",
      };
      link += `/${elem}`;
      obj.link = link;
      this.breadcrumbs.push(obj);
    });
  }
  //** Get BreadcrumbsLabel */
  private getBreadcrumbsLabel(i: number, data: ICategories[]): void {
    const routes = this.getRoutes(this.getUrlParams());
    const category = data.filter(
      el => this.categoryService.transliter(el.category) === routes[i]
    )[0];
    if (!category) {
      // TODO Установить переадресацию на Not-Found если категория не существует
      // this.goTo(this.routerLink);
      // this.router.navigate(["/**"]);
      return;
    }
    console.log(category);
    this.breadcrumbs[i].label = category.category;
    i++;
    if (i >= routes.length) {
      return;
    }

    if (category.body) this.getBreadcrumbsLabel(i, category.body);
  }

  // ***************************************** Start
  // private changeBreadcrumbs(titles: string[], data: ICategoryMenu[]) {
  //   // this.breadcrumbs = ["Главная"];
  //   let i = 0;

  //   this.getBreadcrumbs(titles, i, data);

  //   // const category = data.filter(
  //   //   el => this.categoryService.transliter(el.category) === titles[i]
  //   // )[0];
  //   // this.breadcrumbs.push(category.category);
  //   // i++;
  //   // const subcategory = category.body.filter(
  //   //   el => this.categoryService.transliter(el.category) === titles[i]
  //   // )[0];
  //   // this.breadcrumbs.push(subcategory.category);
  //   // i++;
  //   // if (subcategory.body) {
  //   //   const subcategoryItem = subcategory.body.filter(
  //   //     el => this.categoryService.transliter(el) === titles[i]
  //   //   )[0];
  //   //   this.breadcrumbs.push(subcategoryItem);
  //   // }
  //   console.log(this.breadcrumbs);
  // }
  // private getBreadcrumbs(arr: string[], i: number, data: ICategories[]): void {
  //   const category = data.filter(el => this.categoryService.transliter(el.category) === arr[i])[0];
  //   if (!category) {
  //     // this.goTo(this.routerLink);
  //     this.router.navigate(["/**"]);
  //     return;
  //   }
  //   console.log(category);
  //   this.breadcrumbs.push(category.category);
  //   i++;
  //   if (i >= arr.length) {
  //     return;
  //   }

  //   if (category.body) this.getBreadcrumbs(arr, i, category.body);
  // }

  // private forEachMethod(item: Route, i: number, titles: string[]) {
  //   item.children?.forEach(elem => {
  //     if (elem.path === ":category" && i < titles.length) {
  //       elem.title = titles[i];
  //       i++;
  //       this.forEachMethod(elem, i, titles);
  //     }
  //   });
  // }
  // private setTitleUrl(titles: string[], data: ICategoryMenu[]) {
  //   let i = 0;
  //   console.log(titles);
  //   console.log(data);
  //   console.log(data.filter(el => this.categoryService.transliter(el.category) === titles[i]));

  //   this.changeBreadcrumbs(titles, data);

  //   this.router.config.forEach(el => {
  //     console.log(el);
  //     if (el.path === "sevastopol" && el.children) {
  //       el.title = `${this.city}`;
  //       this.forEachMethod(el, i, this.breadcrumbs);
  //     }
  //   });
  //   console.log(this.router.config);
  // }
  // **************************************** End

  //** GET Products */
  getProducts() {
    this.categoryService.getProducts().subscribe((prod: IProduct[]) => {
      this.products = prod;
      const p = prod.map(el => {
        return el.category;
      });
      console.log(p);
    });
  }

  onGetLinkBreadcrumbsProps(props: IBreadcrumbs | null) {
    if (!props) {
      // this.categoryService.setBreadcrumbsLabels$([]);
      this.goTo("");
      return;
    }

    console.log(props);
    console.log(props.link.split("/"));
    console.log(props.link.split("/").slice(2));
    console.log(props.link);
    // this.categoryService.setBreadcrumbsLabels$(props.label.split("/").slice(2));
    // this.categoryService.setBreadcrumbsLabels$(props.label.split("/").slice(2));
    this.goTo(props.link);
  }

  onGetIdAndTitleProps(props: { id: number; title: string }): void {
    const link = this.getUrlParams() + "/" + props.title + "_" + props.id;
    console.log(link);
    this.isProductInfo = true;
    this.goTo(link);
  }

  goTo(str: string): void {
    console.log(str);
    this.router.navigateByUrl(`/${str}`);
    console.log(this.router);
  }

  ngOnDestroy(): void {
    this.unSubscribeCategories.unsubscribe();
    // this.unSubscribeBreadcrumbs.unsubscribe();
  }
}
