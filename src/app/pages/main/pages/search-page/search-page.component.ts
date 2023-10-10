import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription, filter } from "rxjs";

import { IBreadcrumbs } from "src/app/pages/main/types/breadcrumbs.interface";
import { ICategories } from "src/app/pages/main/types/categories.interface";
import { IFormFilter } from "src/app/pages/main/types/form-filter.interface";
import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { ProductService } from "src/app/shared/services/product-service/product.service";
import { QueryParamsService } from "src/app/shared/services/query-params-service/query-params.service";
import { INewCategory } from "src/app/shared/types/category.interface";
import { IProduct } from "src/app/shared/types/products.interface";
import { EStaticVar } from "src/app/shared/types/staticVar.enum";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.scss"],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  private unSubscribeRouterEvents!: Subscription;
  private unSubscribeCategories!: Subscription;
  // private unSubscribeBreadcrumbs!: Subscription;
  // private city = "Севастополь";

  isProductInfo = false;
  // isSearch = false;
  products!: IProduct[];
  categories!: INewCategory[];
  breadcrumbs!: IBreadcrumbs[];
  activeCategory!: string;
  activeSubcategory!: string;
  activeFilterCategory!: string | null;
  titlePage!: string;
  term!: string | null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private queryParamsService: QueryParamsService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initializeFetchCategory();
    this.initializeRouterEvents();
    this.initializeQueryParams();
    // ***********
    // this.getFilterByProducts();
  }
  //** Get Categories */
  private initializeFetchCategory(): void {
    this.unSubscribeCategories = this.categoryService
      .fetchCategories()
      .subscribe((data: INewCategory[]) => {
        console.log(data);
        this.categories = data;

        this.setBreadcrumbs(data);
      });
  }
  //** Get Query Params */
  private initializeQueryParams() {
    this.activatedRoute.queryParams.subscribe(data => {
      console.log(data);
      console.log(data["search"]);

      if (data["search"]) {
        // this.isSearch = true;
        this.term = data["search"];
      } else this.term = null;
      // this.isSearch = false;
    });
  }
  //** Get Breadcrumbs */
  private initializeRouterEvents() {
    this.unSubscribeRouterEvents = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.setBreadcrumbs(this.categories);
      });
  }
  //** Get Url */
  private getUrlParams(): string {
    console.log(this.router.url);
    return this.router.url;
    // return this.router.routerState.snapshot.url;
  }
  //** Url => string[] */
  private getRoutes(url: string): string[] {
    // this.setIsSearch(str.split("/")[str.split("/").length - 1]);

    // if (!this.isSearch) {
    if (url.split("/").length >= EStaticVar.ROUTES_LENGTH_PRODUCT_PAGE) {
      this.isProductInfo = true;
    } else this.isProductInfo = false;

    if (this.term) url = url.split(`?${EStaticVar.QUERY_SEARCH}`)[0];
    // }
    return url.split("/").slice(2);
  }
  //** Set isSearch */
  // private setIsSearch(str: string): void {
  //   console.log(str);
  //   console.log(str.split(EStaticVar.SEARCH)[0]);
  //   if (this.isSearch) {
  //     this.isSearch = true;
  //     console.log(str.slice(EStaticVar.SEARCH.length - 1));
  //     this.term = str.slice(EStaticVar.SEARCH.length - 1);
  //   } else this.isSearch = false;
  // }

  //** Set Breadcrumbs on page load */
  private setBreadcrumbs(data: INewCategory[]): void {
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
  private getBreadcrumbsLabel(i: number, data: INewCategory[]): void {
    const routes = this.getRoutes(this.getUrlParams());
    const category = data.filter(
      el => this.queryParamsService.transliter(el.name) === routes[i]
    )[0];
    if (!category) {
      // TODO Установить переадресацию на Not-Found если категория не существует
      // this.goTo(this.routerLink);
      // this.router.navigate(["/**"]);
      return;
    }
    console.log(category);
    this.breadcrumbs[i].label = category.name;
    i++;
    if (i >= routes.length) {
      this.setTitlePage(this.breadcrumbs[i - 1].label);
      return;
    }

    if (category.body) this.getBreadcrumbsLabel(i, category.body);
  }
  //** Set Active Categories */
  private setActiveCategories(data: IBreadcrumbs[]) {
    this.activeCategory = data[0].label;
    this.activeFilterCategory = data[0].label;
    if (data[1]) {
      this.activeSubcategory = data[1].label;
    }
    if (this.term) {
      this.activeFilterCategory = null;
    }
  }
  filterByCategories(data: INewCategory[], active: string | null): INewCategory[] {
    console.log(!active);
    if (!active) {
      return data;
    }

    return data.filter(el => el.name === active);
  }
  setTitlePage(value: string) {
    this.titlePage = value;
  }
  //** GET Products */
  // getFilterByProducts() {
  //   this.productService
  //     .getFilterByProducts({
  //       title: "",
  //       categoryId: "",
  //       min: "",
  //       max: "",
  //       offset: "50",
  //       limit: "100",
  //     })
  //     .subscribe((prod: IProduct[]) => {
  //       this.products = prod;
  //       const p = prod.map(el => {
  //         return el.category;
  //       });
  //       console.log(p);
  //     });
  // }
  // getCat() {
  //   this.categoryService.getCat().subscribe((prod: any[]) => {
  //     // this.products = prod;
  //     // const p = prod.map(el => {
  //     //   return el.category;
  //     // });
  //     console.log(prod);
  //   });
  // }

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
    let link = this.getUrlParams();

    if (this.term) {
      link = link.split(`?${EStaticVar.QUERY_SEARCH}`)[0];
    }

    link = link + "/" + this.queryParamsService.transliter(props.title) + "_" + props.id;
    this.isProductInfo = true;
    console.log(link);
    this.goTo(link);
  }

  onGetRouterLinkProps(props: string) {
    let link = `sevastopol/${this.queryParamsService.transliter(props)}`;
    if (this.term) {
      link = `${link}?${EStaticVar.QUERY_SEARCH}${this.term}`;
    }
    this.goTo(link);
  }

  onSubmitFormFilterProps(props: IFormFilter) {
    let link = this.getUrlParams();
    console.log(props);
    console.log(this.getUrlParams());
    if (this.term) {
      if (props.from) {
        link += "&price-min=" + props.from;
      }
      if (props.to) {
        link += "&price-max=" + props.to;
      }
    } else {
      if (props.from) {
        if (props.to) {
          link += "?price-min=" + props.from + "&price-max=" + props.to;
        } else link += "?price-min=" + props.from;
      } else if (props.to) {
        link += "?price-max=" + props.to;
      }
    }
    // link = this.getUrlParams() + "?price-min=" + props.from + "&price-max=" + props.to;

    console.log(link);
    this.goTo(link);
  }

  goTo(link: string): void {
    console.log(link);
    this.router.navigateByUrl(`/${link}`);
  }

  ngOnDestroy(): void {
    this.unSubscribeRouterEvents.unsubscribe();
    this.unSubscribeCategories.unsubscribe();
  }
}
