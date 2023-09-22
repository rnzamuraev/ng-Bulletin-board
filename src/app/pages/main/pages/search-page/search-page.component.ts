import { Component, OnInit } from "@angular/core";
import { Route, Router } from "@angular/router";

import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { ICategoryMenu } from "src/app/shared/types/category.interface";
import { IProduct } from "src/app/shared/types/products.interface";

interface ICategories {
  id: number;
  category: string;
  body: any[] | null;
}

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.scss"],
})
export class SearchPageComponent implements OnInit {
  products!: IProduct[];
  city = "Севастополь";
  categories!: ICategoryMenu[];
  breadcrumbs!: string[];
  routerLink!: string;
  titlePage!: string;
  searchText!: string;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategory();
  }

  getProducts() {
    this.categoryService.getProducts().subscribe((prod: IProduct[]) => {
      this.products = prod;
    });
  }

  private getCategory() {
    this.categoryService.getCategory().subscribe((data: ICategoryMenu[]) => {
      this.categories = data;
      const titles = this.getUrlRouts();
      this.setTitleUrl(titles, data);
    });
  }

  private getUrlRouts(): string[] {
    console.log(this.router);
    this.routerLink = this.router.routerState.snapshot.url;
    return this.router.routerState.snapshot.url.split("/").slice(2);
  }

  private changeBreadcrumbs(titles: string[], data: ICategoryMenu[]) {
    this.breadcrumbs = ["Главная"];
    let i = 0;

    this.getBreadcrumbs(titles, i, data);

    // const category = data.filter(
    //   el => this.categoryService.transliter(el.category) === titles[i]
    // )[0];
    // this.breadcrumbs.push(category.category);
    // i++;
    // const subcategory = category.body.filter(
    //   el => this.categoryService.transliter(el.category) === titles[i]
    // )[0];
    // this.breadcrumbs.push(subcategory.category);
    // i++;
    // if (subcategory.body) {
    //   const subcategoryItem = subcategory.body.filter(
    //     el => this.categoryService.transliter(el) === titles[i]
    //   )[0];
    //   this.breadcrumbs.push(subcategoryItem);
    // }
    console.log(this.breadcrumbs);
  }
  private getBreadcrumbs(arr: string[], i: number, data: ICategories[]): void {
    const category = data.filter(el => this.categoryService.transliter(el.category) === arr[i])[0];
    this.breadcrumbs.push(category.category);
    i++;
    if (i >= arr.length) {
      return;
    }

    if (category.body) this.getBreadcrumbs(arr, i, category.body);
  }

  private forEachMethod(item: Route, i: number, titles: string[]) {
    item.children?.forEach(elem => {
      if (elem.path === ":category" && i < titles.length) {
        elem.title = titles[i];
        i++;
        this.forEachMethod(elem, i, titles);
      }
    });
  }
  private setTitleUrl(titles: string[], data: ICategoryMenu[]) {
    let i = 0;
    console.log(titles);
    console.log(data);
    console.log(data.filter(el => this.categoryService.transliter(el.category) === titles[i]));

    this.changeBreadcrumbs(titles, data);

    this.router.config.forEach(el => {
      console.log(el);
      if (el.path === "sevastopol" && el.children) {
        el.title = `${this.city}`;
        this.forEachMethod(el, i, this.breadcrumbs);
      }
    });
    console.log(this.router.config);
  }

  // constructor(private route: ActivatedRoute, private router: Router) {
  // getBreadcrumbsFromCategory() {
  //   this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
  //     this.breadcrumbs = [];
  //     // console.log(this.route);
  //     // this.getBreadcrumbs(this.route.children);
  //     this.getBreadcrumbs(this.route.snapshot);
  //   });
  // }
  onGetIdAndTitleProps(props: { id: number; title: string }): void {
    const link = this.routerLink + "/" + props.id;
    console.log(link);
    this.goTo(link);
  }

  goTo(str: string): void {
    this.router.navigateByUrl(str);
  }
}
