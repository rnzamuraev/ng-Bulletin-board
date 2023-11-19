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
    private location: Location,
  ) {}

  ngOnInit(): void {
    console.log("header ngOnInit: ");
    this._getIsLoadingApp();
    this._initialCity();
    this._getIsSearchPage();
    this._initialFetchCurrentUser();
    this._initialGetCurrentUser();
    this._initialFetchCategories();
    this._initialDropdownItems();
    this._initialQueryParams();
    this._initialRouterEvents();
  }

  //**! При загрузке страницы */
  //** Получаем город пользователя если он был сохранен */
  private _initialCity(): void {
    this.city = this.queryParamsService.getCity;
  }
  //** Получаем URL текущей страницы */
  private _getUrlLink(): string {
    console.log(this.location.path());
    return this.location.path();
  }

  //** Получаем список категорий от сервера */
  private _initialFetchCategories(): void {
    this.categoryService.fetchCategories().subscribe((data: ICategoryChild[]) => {
      this.categories = data;
      this._setCategory(data);
    });
  }
  //** Записываем полученный список категорий в сервис */
  private _setCategory(data: ICategoryChild[]): void {
    this.categoryService.setCategoryChildList(data); //TODO ???
  }
  //** Устанавливаем список ссылок в выпадающем списке */
  private _initialDropdownItems(): void {
    this.dropdownItems = [
      { label: "Мои объявления", link: "lk/my-items", color: "dark" },
      { label: "Настройки", link: "lk/settings", color: "dark" },
      { label: "Выход", link: "", color: "red" },
    ];
  }
  //** Подписываемся на обновления текущего пользователя в сервисе */
  private _initialGetCurrentUser(): void {
    this._unsubscribeGetCurrentUser = this.userService.getCurrentUser$.subscribe(
      (data: IUser | null) => {
        this.currentUser = data;
        if (this.currentUserLogin) this._setUserLogin(data);
      }
    );
  }
  //** Получаем текущего пользователя из API и записываем в сервис */
  private _initialFetchCurrentUser(): void {
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
  private _initialQueryParams(): void {
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
  //** Подписываемся на 'Event' событие по окончанию перехода на другую страницу */
  private _initialRouterEvents() {
    this._unSubscribeRouterEvents = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        console.log("NavigationEnd");
        this._getIsSearchPage();
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
  //** Получить город для поиска объявлений из 'LocalStorage' */
  private _getCity(): string {
    return this.queryParamsService.getCity;
  }

  //**! Работа с данными после загрузки страницы */
  //** Закрываем меню при получении из дочернего компонента выбранного пункта меню */
  onCloseMenuProps(props: boolean): void {
    this.onToggleMenu(props);
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
  //** Отписываемся от кастомных подписок */
  ngOnDestroy(): void {
    this._unsubscribeTerm.unsubscribe();
    this._unsubscribeGetCurrentUser.unsubscribe();
    this._unSubscribeRouterEvents.unsubscribe();
  }
}
