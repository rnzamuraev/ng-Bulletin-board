import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription, filter } from "rxjs";

import { IBreadcrumbs } from "src/app/pages/main/types/breadcrumbs.interface";
import { ICategories } from "src/app/pages/main/types/categories.interface";
import { IFormFilter } from "src/app/pages/main/types/form-filter.interface";
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
  activeCategory!: string;
  activeSubcategory!: string;
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
    this.setActiveCategories(this.breadcrumbs);
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
  //** Set Active Categories */
  private setActiveCategories(data: IBreadcrumbs[]) {
    this.activeCategory = data[0].label;
    this.activeSubcategory = data[1].label;
  }

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
  getCat() {
    this.categoryService.getCat().subscribe((prod: any[]) => {
      // this.products = prod;
      // const p = prod.map(el => {
      //   return el.category;
      // });
      console.log(prod);
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
    const link =
      this.getUrlParams() + "/" + this.categoryService.transliter(props.title) + "_" + props.id;
    console.log(link);
    this.isProductInfo = true;
    this.goTo(link);
  }

  onGetRouterLinkProps(props: string) {
    console.log(props);
    this.goTo("sevastopol/" + this.categoryService.transliter(props));
  }

  onSubmitFormFilterProps(props: IFormFilter) {
    console.log(props);
  }

  goTo(str: string): void {
    console.log(str);
    this.router.navigateByUrl(`/${str}`);
  }

  ngOnDestroy(): void {
    this.unSubscribeCategories.unsubscribe();
    // this.unSubscribeBreadcrumbs.unsubscribe();
  }
}
