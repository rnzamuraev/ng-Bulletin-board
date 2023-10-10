import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { IDropdownItem } from "src/app/layout/types/dropdown-item.interface";
import { AuthService } from "src/app/pages/auth/services/auth-service/auth.service";
import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { LocalStorageService } from "src/app/shared/services/local-storage-service/local-storage.service";
import { QueryParamsService } from "src/app/shared/services/query-params-service/query-params.service";
import { UserService } from "src/app/shared/services/user-service/user.service";
import { INewCategory } from "src/app/shared/types/category.interface";
import { EStaticVar } from "src/app/shared/types/staticVar.enum";
import { IUser } from "src/app/shared/types/user.interface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _unsubscribeTerm!: Subscription;
  private _unsubscribeCategories!: Subscription;
  private _unsubscribeQueryParams!: Subscription;
  private _unsubscribeCurrentUser!: Subscription;
  private _unsubscribeUser!: Subscription;

  isOpenMenu = false;
  isOpenDropdown = false;
  currentUserLogin!: string | null;
  categories!: INewCategory[];
  dropdownItems!: IDropdownItem[];
  queryParamUrl!: string | null;
  term!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private queryParamsService: QueryParamsService,
    private userService: UserService,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this._initializeDropdownItems();
    this._initializeFetchCategories();
    this._initializeGetCurrentUser();
    this._initializeFetchCurrentUser();
    this._initializeQueryParams();
    this._initializeQueryParamsUrl();
  }

  //**? При загрузке страницы */
  //** устанавливаем список ссылок в выпадающем списке */
  private _initializeDropdownItems(): void {
    this.dropdownItems = [
      { label: "Мои объявления", link: "lk/my-items", color: "dark" },
      { label: "Настройки", link: "lk/settings", color: "dark" },
      { label: "Выход", link: "", color: "red" },
    ];
  }
  //** Подписываемся на обновления текущего пользователя в сервисе */
  private _initializeGetCurrentUser(): void {
    this.userService.getCurrentUser.subscribe((user: IUser | null) => {
      console.log(user);
      if (user) this.currentUserLogin = user.name;
      else this.currentUserLogin = user;
    });
  }
  //** Получаем текущего пользователя из API и записываем в сервис */
  private _initializeFetchCurrentUser(): void {
    this.userService.fetchCurrentUser.subscribe((user: IUser | null) => {
      if (this.localStorage.get(EStaticVar.USER_TOKEN_KEY)) {
        console.log(user);
        // this._setCurrentUser(user);
        this.userService.setCurrentUser(user);
      }
    });
  }
  // private _setCurrentUser(user: IUser | null) {
  //   console.log(user);
  //   if (user) this.currentUserLogin = user;
  //   else this.currentUserLogin = user;
  // }

  private _initializeQueryParams(): void {
    this._unsubscribeTerm = this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.term = this.queryParamsService.setQueryParam(params, EStaticVar.QUERY_SEARCH);
      this.queryParamsService.setQueryParamUrl$(params);
    });
  }
  private _initializeQueryParamsUrl(): void {
    this._unsubscribeQueryParams = this.queryParamsService.getQueryParamUrl$.subscribe(
      (data: string | null) => {
        this.queryParamUrl = data;
      }
    );
  }
  // private checkObjectForEmptiness(data: Params): boolean {
  //   if (Object.keys(data).length) return true;
  //   else return false;
  // }
  // private _initializeCategories(): void {
  //   this._unsubscribeCategories = this.categoryService
  //     .getCategory()
  //     .subscribe((data: ICategoryMenu[]) => {
  //       this.categories = data;
  //     });
  // }
  private _initializeFetchCategories(): void {
    this._unsubscribeCategories = this.categoryService
      .fetchCategories()
      .subscribe((data: INewCategory[]) => {
        console.log(data);
        this.categories = data;
      });
  }

  //** Работа с данными после загрузки страницы */
  //*** Toggle Menu */
  onCloseMenuProps(value: boolean): void {
    this.isOpenMenu = value;
    this._toggleScrolling();
  }
  onToggleMenu(): void {
    this.isOpenMenu = !this.isOpenMenu;
    this._toggleScrolling();
  }
  private _toggleScrolling(): void {
    this.isOpenMenu ? this._disableScrolling() : this._enableScrolling();
  }
  onToggleScrollingProps(props: boolean): void {
    console.log(props);
    props ? this._disableScrolling() : this._enableScrolling();
  }
  private _disableScrolling(): void {
    const div = document.createElement("div");
    const body = document.body;
    body.appendChild(div);
    const bodyHeight = body.scrollHeight;
    div.style.width = "100px";
    div.style.height = "100vh";
    bodyHeight > div.getBoundingClientRect().height ? (div.style.overflowY = "scroll") : null;
    body.style.paddingRight = 100 - div.clientWidth + "px";
    div.remove();
    body.style.overflow = "hidden";
  }
  private _enableScrolling(): void {
    const body = document.body;
    body.style.overflow = "";
    body.style.paddingRight = "0";
  }

  //*** Search Input */
  getTermProps(value: string): void {
    let link: string = this.router.url;
    let q = "?";
    let isSearch = false;
    // if (value !== "") {
    if (this.queryParamUrl) {
      console.log(link);
      console.log(link.slice(0, -this.queryParamUrl.length));
      link = link.slice(0, -this.queryParamUrl.length);
      console.log(link);
      console.log(this.queryParamUrl);
      console.log(this.queryParamsService.getQueryParams);
      this.queryParamsService.getQueryParams.forEach(
        (elem: { label: string; value: string }, i: number) => {
          if (elem.label === "search") {
            isSearch = true;
            if (i > 0) {
              q = "&";
            }
            if (value === "") {
              if (i > 0) {
                return;
              } else {
                if (this.queryParamsService.getQueryParams.length > 1) {
                  this.queryParamUrl
                    ? (console.log(this.queryParamUrl.slice(elem.value.length + 1)),
                      (link += `?${this.queryParamUrl.slice(elem.value.length + 1)}`))
                    : null;
                } else elem.value = "";
              }
            } else elem.value = `${q}${EStaticVar.QUERY_SEARCH}${value}`;
          }
          link += elem.value;
        }
      );
      if (!isSearch) link += `&${EStaticVar.QUERY_SEARCH}${value}`;
    } else link += `?${EStaticVar.QUERY_SEARCH}${value}`;
    // } else {
    //   if (this.queryParamsService.getQueryParams.length > 1) {
    //     this.queryParamUrl
    //       ? (console.log(this.queryParamUrl.slice(elem.value.length + 1)),
    //         (link += `?${this.queryParamUrl.slice(elem.value.length + 1)}`))
    //       : null;
    // } ;
    // }

    console.log(link);
    this.onGoTo(`${link}`);
  }

  onOpenAuthComponent(): void {
    // this.dialog.open({ component: AuthComponent });
    this.authService.open();
  }

  onDropdownToggleProps(props: boolean): void {
    this.isOpenDropdown = props;
  }
  onDropdownItemProps(props: IDropdownItem): void {
    this.onGoTo(props.link);
    this._logout(props.label);
  }
  private _logout(exit: string): void {
    if (exit.toLowerCase() === "выход") {
      this.userService.setCurrentUser(null);
      this.localStorage.remove(EStaticVar.USER_TOKEN_KEY);
    }
  }

  onGoTo(value: string): void {
    console.log(value);
    this.router.navigateByUrl(`/${value}`);
  }

  ngOnDestroy(): void {
    this._unsubscribeTerm.unsubscribe();
    this._unsubscribeCategories.unsubscribe();
    this._unsubscribeQueryParams.unsubscribe();
    this._unsubscribeUser.unsubscribe();
  }
}

// ******************
// private getUser(): void {
// this.stateService.getUser$.subscribe(data => {
//   if (data === null) {
// this.isLogin = false;
//     return;
//   }
//   this.isLogin = true;
//   this.userName = data.name;
// });
// }
