import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Params, Router } from "@angular/router";
import { Subscription, filter } from "rxjs";

import { IDropdownItem } from "src/app/layout/types/dropdown-item.interface";
import { AdvertService } from "src/app/shared/services/adverts-service/advert.service";
import { BreadcrumbsService } from "src/app/shared/services/breadcrumbs-service/breadcrumbs.service";
import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { ErrorMessageService } from "src/app/shared/services/error-message-service/error-message.service";
import { OpenService } from "src/app/shared/services/open-service/open.service";
import { QueryParamsService } from "src/app/shared/services/query-params-service/query-params.service";
import { UserService } from "src/app/shared/services/user-service/user.service";
import { ICategoryChild } from "src/app/shared/types/category.interface";
import { IUser } from "src/app/shared/types/user.interface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _unsubscribeTerm!: Subscription;
  private _unsubscribeGetCurrentUser!: Subscription;
  private _unSubscribeRouterEvents!: Subscription;
  // private _unsubscribeCategories!: Subscription;
  // private _unsubscribeQueryParams!: Subscription;
  private _unsubscribeUser!: Subscription;

  isOpenMenu = false;
  isOpenDropdown = false;
  isSearchPage = false;
  currentUser!: IUser | null;
  currentUserLogin!: string;
  categories!: ICategoryChild[];
  dropdownItems!: IDropdownItem[];
  queryParamUrl!: string | null;
  term!: string;
  min!: string;
  max!: string;
  city!: string;
  sort!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private queryParamsService: QueryParamsService,
    private userService: UserService,
    private openService: OpenService,
    private breadcrumbsService: BreadcrumbsService,
    private location: Location,
    private advertService: AdvertService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    console.log("header ngOnInit: ");
    this._getIsLoadingApp();
    this._initializeCity();
    this._getIsSearchPage();
    this._initializeFetchCurrentUser();
    this._initializeGetCurrentUser();
    this._initializeFetchCategories();
    this._initializeDropdownItems();
    this._initializeQueryParams();
    // this._initializeUrlParams();
    this._initializeRouterEvents();
    // this._initializeQueryParamsUrl();
  }

  //**! При загрузке страницы */
  //** Получаем город пользователя если он был сохранен */
  private _initializeCity(): void {
    this.city = this.queryParamsService.getCity;
  }
  //** Получаем URL текущей страницы */
  private _getUrlLink(): string {
    console.log(this.location.path());
    return this.location.path();
  }

  //** Получаем список категорий от сервера */
  private _initializeFetchCategories(): void {
    // this._unsubscribeCategories =
    this.categoryService
      .fetchCategories()
      // .pipe(
      //   tap(data => {
      //     // if (data && this.term) {
      //     //   this._fetchSearch(this.term, data);
      //     // }
      //   })
      // )
      .subscribe((data: ICategoryChild[]) => {
        console.log(data);
        this.categories = data;
        this._setCategory(data);
        // this._setBreadcrumbs();
      });
  }
  //** Записываем полученный список категорий в сервис */
  private _setCategory(data: ICategoryChild[]): void {
    this.categoryService.setCategoryChildList(data); //TODO ???
  }
  //** Устанавливаем список ссылок в выпадающем списке */
  private _initializeDropdownItems(): void {
    this.dropdownItems = [
      { label: "Мои объявления", link: "lk/my-items", color: "dark" },
      { label: "Настройки", link: "lk/settings", color: "dark" },
      { label: "Выход", link: "", color: "red" },
    ];
  }
  //** Подписываемся на обновления текущего пользователя в сервисе */
  private _initializeGetCurrentUser(): void {
    this._unsubscribeGetCurrentUser = this.userService.getCurrentUser.subscribe(
      (data: IUser | null) => {
        this.currentUser = data;
        if (this.currentUserLogin) this._setUserLogin(data);
      }
    );
  }
  //** Получаем текущего пользователя из API и записываем в сервис */
  private _initializeFetchCurrentUser(): void {
    this.userService.fetchCurrentUser().subscribe((user: IUser | null) => {
      this._setUserLogin(user);
      this._setCurrentUser(user);
    });
  }
  //** Устанавливаем имя текущего пользователя если он вошел в систему */
  private _setUserLogin(user: IUser | null): void {
    console.log(user);
    if (user) {
      this.currentUserLogin = user.name;
      console.log(this.currentUserLogin);
      return;
    }
    this.currentUserLogin = "Войти";
    console.log(this.currentUserLogin);
  }
  //** Записываем в сервис данные текущего пользователя */
  private _setCurrentUser(user: IUser | null): void {
    this.userService.setCurrentUser(user);
  }
  //** Подписываемся на 'QueryParams', проверяем есть ли поисковый запрос */
  private _initializeQueryParams(): void {
    this._unsubscribeTerm = this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      if (params["search"]) this.term = params["search"];
      else this.term = "";
      if (params["min"]) this.min = params["min"];
      else this.min = "";
      if (params["max"]) this.max = params["max"];
      else this.max = "";
      // this.getQueryParams(params);
    });
  }
  //** Получить поисковые параметры из подписки на параметры поиска */
  getQueryParams(data: Params) {
    console.log(data);
  }
  // //**! Подписываемся на изменения 'Params' */
  // private _initializeUrlParams() {
  //   this.activatedRoute.params.subscribe((data: Params) => {
  //     console.log("Параметры полученные из 'Header'");
  //     console.log(data);
  //   });
  // }
  // //********************************************! */
  //** Подписываемся на 'Event' событие по окончанию перехода на другую страницу */
  private _initializeRouterEvents() {
    this._unSubscribeRouterEvents = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        console.log("NavigationEnd");
        this._getIsLoadingApp();
        this._getIsSearchPage();

        if (this.categories) {
          // this._setBreadcrumbs();
        }
      });
  }
  //** Проверяем находится ли пользователь на страницах Личного Кабинета */
  private _getIsLoadingApp(): void {
    console.log(this._getTypePages("lk"));
    if (this._getTypePages("lk")) this.queryParamsService.setIsLoadingApp(true);
  }
  //** Проверяем находится ли пользователь на страницах Поиска */
  private _getIsSearchPage(): void {
    console.log(this._getTypePages(`${this.city}`));
    if (this._getTypePages(`${this.city}`)) this.isSearchPage = true;
  }
  //** Проверяем на какой странице находится пользователь при перезагрузке приложения */
  private _getTypePages(value: string): boolean {
    if (this._getUrlLink().split("/")[1] === value) {
      return true;
    }
    return false;
  }
  // private _setBreadcrumbsReset() {
  //   this.breadcrumbsService.setBreadcrumbsReset(true);
  // }
  //** Задаем параметры для хлебных крошек (при загрузке страницы) */
  // private _setBreadcrumbs(): void {
  //   this._getLengthBreadcrumbs(this._getRoutes(this._getUrlLink()));
  //   // this.breadcrumbs = [];
  //   // let i = 0;
  //   // this._getBreadcrumbsLinks(this._getRoutes(this._getUrlParams()));
  //   this._getBreadcrumbsItems(this.categories, 0);
  //   // this._setActiveCategories(this.breadcrumbs);
  //   // console.log(this.breadcrumbs);
  // }
  // //** Получаем длину массива хлебных крошек */
  // private _getLengthBreadcrumbs(data: string[]) {
  //   let length!: number;
  //   if (data.filter((elem: string) => elem === "ad").length > 0) length = data.length - 1;
  //   else length = data.length;
  //   this.breadcrumbsService.setLengthBreadcrumbs(length);
  // }
  // //** Get BreadcrumbsLabel */
  // private _getBreadcrumbsItems(categories: ICategoryChild[], i: number): void {
  //   const routes = this._getRoutes(this._getUrlLink());
  //   console.log(i);
  //   console.log(routes);
  //   console.log(categories);
  //   const category = categories.filter(
  //     (elem: ICategoryChild) => this.queryParamsService.transliter(elem.name) === routes[i]
  //   )[0];
  //   if (!category) {
  //     console.log(category);
  //     this.setErrorNotFoundPage();
  //     return;
  //   }
  //   this._setBreadcrumbsItems(category, i);
  //   if (i < routes.length - 1 && category.body.length > 0) {
  //     this._getBreadcrumbsItems(category.body, i + 1);
  //   }
  // }
  // // ** Преобразуем 'Url' страницы в массив ссылок для роутинга */
  // private _getRoutes(url: string): string[] {
  //   if (this.term) url = url.split(`?${EStaticVar.QUERY_SEARCH}`)[0];
  //   return url.split("/").slice(2);
  // }
  // //** Получаем ссылки перехода на другие страницы для хлебных крошек */
  // private _setBreadcrumbsItems(category: ICategoryChild, index: number): void {
  //   const routes = this._getRoutes(this._getUrlLink());
  //   let link = this._getCity();
  //   routes.forEach((elem: string, i: number) => {
  //     if (i > index) return;
  //     link += `/${elem}`;
  //   });
  //   this.breadcrumbsService.setBreadcrumbs({ link, label: category.name, id: category.id });
  // }
  // //** устанавливаем сообщение об ошибке */
  // private setErrorNotFoundPage(): void {
  //   // this.errorMessageService.setIsNotFoundPage(true);
  //   console.log("Такой категории нет"); //
  //   // TODO Установить переадресацию на Not-Found если категория не существует
  // }
  //** Получить город для поиска объявлений из 'LocalStorage' */
  private _getCity(): string {
    return this.queryParamsService.getCity;
  }

  //**! Работа с данными после загрузки страницы */
  //** Закрываем меню при получении из дочернего компонента выбранного пункта меню */
  onCloseMenuProps(props: boolean): void {
    this.onToggleMenu(props);
    // this.isOpenMenu = props;
    // this._toggleScrolling();
  }
  //** Переключатель режимов меню Открыто/Закрыто */
  onToggleMenu(isValue: boolean): void {
    // this.isOpenMenu = !this.isOpenMenu;
    this.isOpenMenu = isValue;
    this._toggleScrolling();
  }
  //** Отключаем прокрутку страницы */
  private _toggleScrolling(): void {
    this.openService.toggleScrolling(this.isOpenMenu);
    // this.isOpenMenu ? this._disableScrolling() : this._enableScrolling();
  }
  //** Получаем значение из поисковой строки дочернего компонента */
  onGetTermProps(value: string): void {
    this.term = value.trim().toLowerCase();
    console.log(this.term);
    console.log(this.isSearchPage);
    let link: string = this._getUrlLink().split("?")[0];
    if (!this.isSearchPage) link = this.city;
    this.onGoTo(link);
  }
  // //** Поиск по тексту */
  // private _fetchSearch(value: string, categories: ICategoryChild[]): void {
  //   this.advertService.searchAllAdverts(categories, value);
  // }
  //** Переключатель режимов "Dropdown" Открыто/Закрыто */
  onDropdownToggleProps(props: boolean): void {
    this.isOpenDropdown = props;
  }
  //** Получаем объект с параметрами из "Dropdown" по которому был совершен клик */
  onDropdownItemProps(props: IDropdownItem): void {
    console.log(props);
    if (props.label.toLowerCase() !== "выход") {
      this.onGoTo(props.link);
      return;
    }
    this._logout();
  }
  //** Выход из аккаунта */
  private _logout(): void {
    this._goToHome();
    // this._removeToken();
    this._setCurrentUser(null);
    this._setUserLogin(this.currentUser);
  }
  //** Редирект на главную если текущая страница === страница личного кабинета */
  private _goToHome() {
    if (this._getTypePages("lk")) {
      this._closeMenu();
      this.onGoTo("");
    }
  }
  //** Переход по ссылке на другую страницу */
  onGoTo(link: string): void {
    this._closeMenu();
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
  private _closeMenu() {
    this.onToggleMenu(false);
  }
  // private _openAuthComponent(link: string): void {
  //   console.log(this.currentUserLogin);
  //   this.openService.openAuth(link);
  // }
  //** Отписываемся от кастомных подписок */
  ngOnDestroy(): void {
    this._unsubscribeTerm.unsubscribe();
    this._unsubscribeGetCurrentUser.unsubscribe();
    this._unSubscribeRouterEvents.unsubscribe();
    // this._unsubscribeCategories.unsubscribe();
    // this._unsubscribeQueryParams.unsubscribe();
    // this._unsubscribeUser.unsubscribe();
  }
}
