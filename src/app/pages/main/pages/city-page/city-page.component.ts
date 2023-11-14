import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { IFormFilter } from "src/app/pages/main/types/form-filter.interface";
import { AdvertService } from "src/app/shared/services/adverts-service/advert.service";
import { BreadcrumbsService } from "src/app/shared/services/breadcrumbs-service/breadcrumbs.service";
import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { ErrorMessageService } from "src/app/shared/services/error-message-service/error-message.service";
import { QueryParamsService } from "src/app/shared/services/query-params-service/query-params.service";
import { IAdvertUser } from "src/app/shared/types/adverts.interface";
import { IBreadcrumbs } from "src/app/shared/types/breadcrumbs.interface";
import { ICategoryChild } from "src/app/shared/types/category.interface";

@Component({
  selector: "app-city-page",
  templateUrl: "./city-page.component.html",
  styleUrls: ["./city-page.component.scss"],
})
export class CityPageComponent implements OnInit, OnDestroy {
  private _unSubscribeGetNewCategoryList!: Subscription;
  private _unGetAdvertsAfterSearching!: Subscription;
  private _unGetBreadcrumbs!: Subscription;

  isErrorMessage!: boolean;
  isNotFoundPage!: boolean;
  isInfoPage!: boolean;
  adverts!: IAdvertUser[];
  categories!: ICategoryChild[];
  categoriesSideBar!: ICategoryChild[];
  breadcrumbs!: IBreadcrumbs[];
  activeCategory!: string;
  activeSubcategory!: string;
  activeItem!: string;
  titlePage!: string;
  term = "";
  min = "";
  max = "";
  sort = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorMessage: ErrorMessageService,
    private queryParamsService: QueryParamsService,
    private breadcrumbsService: BreadcrumbsService,
    private categoryService: CategoryService,
    // private location: Location,
    private advertService: AdvertService
  ) {
    this._initialGetCategory();
  }

  ngOnInit(): void {
    this._initialIsNotFound();
    this._initialQueryParams();
    this._initialAdvertResponse();
    this._initialBreadcrumbs();
  }
  //** Подписываемся на изменения статуса 'Not Found' */
  private _initialIsNotFound() {
    this.errorMessage.getIsNotFoundPage.subscribe((isData: boolean) => {
      console.log(isData);
      this.isNotFoundPage = isData;
    });
  }
  //** Подписываемся на изменения 'QueryParams' */
  private _initialQueryParams() {
    this.activatedRoute.queryParams.subscribe((data: Params) => {
      console.log(this.adverts);
      console.log(data);
      this.getSearchParams(data);
      this.adverts = [];
      if (this.breadcrumbs || (this.categories && `/${this._getCity()}` === this._getQueryLink()))
        this._getAdvertByCategory(this.breadcrumbs);
      // if (`/${this._getCity()}` === this.location.path().split("?")[0])
      //   this._getAdvertByCategory(this.breadcrumbs[this.breadcrumbs.length - 1].category);
    });
  }
  //** Получить 'Query Params' из подписки на параметры поиска */
  getSearchParams(data: Params) {
    console.log(data);
    console.log(data["search"]);
    this.term = this._setSearchParam(data, "search");
    this.min = this._setSearchParam(data, "min");
    this.max = this._setSearchParam(data, "max");
    this.sort = this._setSearchParam(data, "sort");

    // if (data["search"]) this.term = data["search"];
    // else this.term = "";
    // if (data["min"]) this.min = data["min"];
    // else this.min = "";
    // if (data["max"]) this.max = data["max"];
    // else this.max = "";
    // if (data["sort"]) this.sort = data["sort"];
    // else this.sort = "";
    console.log(data);
  }
  private _setSearchParam(data: Params, value: string): string {
    if (data[value]) return data[value];
    else return "";
  }
  //** Получаем от сервера объявления по поиску введенного значения или полученной категории */
  private _initialAdvertResponse() {
    // this.categoriesSearch = [];
    this._resetErrorMessageAndAdverts();
    this._unGetAdvertsAfterSearching = this.advertService.getAdvertsAfterSearching$.subscribe(
      (data: IAdvertUser[]) => {
        console.log(data);
        if (data.length === 0) {
          console.log("timeout");
          this._errorChecking();
          return;
        }
        this._addAdvertInAdverts(data);
        this._switchValueSort();
      }
    );
  }
  //** Добавляем объявления полученные после поиска в массив объявлений */
  private _addAdvertInAdverts(data: IAdvertUser[]) {
    data.forEach((elem: IAdvertUser) => {
      let filter = +elem.cost > +this.min && +elem.cost < +this.max;
      if (!this.max) filter = +elem.cost > +this.min;
      if (filter) {
        console.log(elem);
        this.adverts.push(elem);
      }
    });
  }
  //** error checking *
  private _errorChecking() {
    if (this.adverts.length > 0) return;
    setTimeout(() => {
      console.log(this.adverts.length);
      console.log("Ничего не найдено");
      this.isErrorMessage = true;
    }, 5000);
  }
  //** Получаем из сервиса список категорий */
  private _initialGetCategory(): void {
    this._unSubscribeGetNewCategoryList = this.categoryService.getCategoryChildList$.subscribe(
      (data: ICategoryChild[] | null) => {
        console.log(data);
        if (data) {
          this.categories = data;
        }
      }
    );
  }
  //** Подписываемся на изменения хлебных крошек */
  private _initialBreadcrumbs() {
    this._unGetBreadcrumbs = this.breadcrumbsService.getBreadcrumbs$.subscribe(
      (data: IBreadcrumbs[] | null) => {
        console.log(data);
        if (data) {
          this.breadcrumbs = data;
          console.log(this.term);
          // if (this.term)
          this._getAdvertByCategory(data);
          // this._setActiveCategories(this.breadcrumbs);
          // if (this.categories) this._filterByCategories();
        }
      }
    );
  }
  // private _filterCategory(br: IBreadcrumbs[],i: number) {
  // private _filterCategory(i: number) {
  //   console.log(this.breadcrumbs);
  //   console.log(this.breadcrumbs[i].category);
  //   console.log(i);
  //   // console.log(
  //   //   this.categories.filter((elem: ICategoryChild) => elem.id === this.breadcrumbs[i].categoryId)
  //   // );
  //   let category!: ICategoryChild;
  //   this.categories.forEach((elem: ICategoryChild) => {
  //     console.log(this.breadcrumbs[i].category);
  //     console.log(i);
  //     console.log(elem.id);
  //     if (elem.id === this.breadcrumbs[i].categoryId) category = elem;
  //   });
  //   if (category.childs.length > 0 && i > this.breadcrumbs.length) this._filterCategory(i + 1);
  //   else this._getAdvertByCategory(category);
  // }
  private _getAdvertByCategory(data: IBreadcrumbs[]) {
    this._filterByCategories();
    let categories = this.categories;
    console.log(data);
    console.log(this.categories);
    if (data) {
      this._setActiveCategories(data);
      const category = data[data.length - 1].category;
      console.log(category);
      if (category) categories = [category];
      console.log(categories);
    }
    this._resetErrorMessageAndAdverts();
    this.advertService.searchAllAdverts(categories, this.term);
  }
  //** Задаем дефолтное значение сообщению ничего не найдено и очищаем список объявлений */
  private _resetErrorMessageAndAdverts() {
    this.isErrorMessage = false;
    this.adverts = [];
  }
  //** Задаем активную категорию для 'Filter Sidebar' и  */
  private _setActiveCategories(data: IBreadcrumbs[]) {
    console.log(data);
    this.activeCategory = data[0].label;
    const category = data[data.length - 1].category;
    if (category) this.activeItem = category.id;
    if (data[1]) this.activeSubcategory = data[1].label;
  }
  private _filterByCategories(): void {
    if (!this.breadcrumbs) {
      this.categoriesSideBar = this.categories;
      return;
    }
    const categories = this.breadcrumbs[0].category;
    if (categories) this.categoriesSideBar = [categories];
  }
  //** Получаем ссылку из хлебных крошек по которой кликнул пользователь */
  onGetLinkBreadcrumbsProps(props: IBreadcrumbs | null) {
    if (!props) {
      this.goTo("");
      return;
    }
    this.goTo(props.link);
  }
  onGetRouterLinkProps(props: string) {
    let link = `${this._getCity()}/${this.queryParamsService.transliter(props)}`;
    this.goTo(link);
  }
  //** Получить город для поиска объявлений из 'LocalStorage' */
  private _getCity(): string {
    return this.queryParamsService.getCity;
  }
  onSubmitFormFilterProps(props: IFormFilter) {
    this.min = props.min;
    this.max = props.max;
    console.log(this._getQueryLink());
    this.goTo(this._getQueryLink());
  }
  //** Сортировка по */
  onGetValueProps(props: { name: string } | null) {
    if (props) this.sort = props.name.toLowerCase();
    else this.sort = "";
    this.goTo(this._getQueryLink());
  }
  private _switchValueSort() {
    switch (this.sort) {
      case "дешевле":
        return this.adverts.sort((a: IAdvertUser, b: IAdvertUser) => a.cost - b.cost);
      case "дороже":
        return this.adverts.sort((a: IAdvertUser, b: IAdvertUser) => b.cost - a.cost);
      case "по дате":
        return this.adverts.sort(
          (a: IAdvertUser, b: IAdvertUser) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
        );
      default:
        return this.adverts;
    }
  }
  private _getQueryLink() {
    return this.router.url.split("?")[0];
  }
  goTo(link: string): void {
    console.log(link);
    this.router.navigate(
      [`/${link}`],
      this.queryParamsService.createQueryParams({
        term: this.term,
        min: this.min,
        max: this.max,
        sort: this.sort,
      })
    );
  }
  //** Отписываемся от кастомных подписок */
  ngOnDestroy(): void {
    this._unSubscribeGetNewCategoryList.unsubscribe();
    this._unGetAdvertsAfterSearching.unsubscribe();
    this._unGetBreadcrumbs.unsubscribe();
  }
}
