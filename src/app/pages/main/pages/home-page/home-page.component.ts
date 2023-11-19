import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AdvertService } from "src/app/shared/services/adverts-service/advert.service";
import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { QueryParamsService } from "src/app/shared/services/query-params-service/query-params.service";
import { IAdvertUser } from "src/app/shared/types/adverts.interface";
import { ICategory, ICategoryChild } from "src/app/shared/types/category.interface";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private _unsubscribeGetSearch!: Subscription;
  private _unsubscribeGetNewCategoryList!: Subscription;
  // private _unsubscribeGetCategoryBreadcrumbs!: Subscription;

  // isBreadcrumbs = false;
  city!: string;
  errorMessage!: string;
  adverts: IAdvertUser[] = [];
  advert!: IAdvertUser;
  categoryListBreadcrumbs!: ICategory[];

  constructor(
    private advertService: AdvertService,
    private categoryService: CategoryService,
    private queryParamsService: QueryParamsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this._initialGetCategoryBreadcrumbs();
    this._initialCategories();
    this._initialAdvert();
  }
  //** Получаем список категорий из сервиса *
  private _initialCategories(): void {
    this._unsubscribeGetNewCategoryList = this.categoryService.getCategoryChildList$.subscribe(
      (data: ICategoryChild[] | null) => {
        console.log(this._getCategoriesId());
        if (this._getCategoriesId().length > 1) {
          this._fetchAdvertsByCategory();
          return;
        }
        if (data) this._setAdvert(data);
      }
    );
  }
  //** Получаем список случайных объявлений из общего списка объявлений *
  private _setAdvert(categories: ICategoryChild[]): void {
    this.advertService.searchAllAdverts(categories, this.getRandomLetter());
  }
  //** Получаем случайную букву для поиска объявлений на главной странице */
  getRandomLetter(): string {
    const num = Math.floor(Math.random() * (9 - 0) + 0); // The maximum is exclusive and the minimum is inclusive
    return this.advertService.getAlphabet[num];
  }
  //** Получаем объявления по категориям которые пользователь ранее кликал */
  private _fetchAdvertsByCategory() {
    const arr = this._getCategoriesId().map((elem: string, i: number) => {
      return this.categoryService.fetchCategoryById(elem).subscribe((data: ICategory | null) => {
        if (data) {
          data.childs = [];
          this.advertService.searchAllAdverts([data as ICategoryChild]);
        }
      });
    });
    //  this._getCategoriesId().forEach((elem: string, i: number) => {
    //     this.categoryService.fetchCategoryById(elem).subscribe((data: ICategory | null) => {
    //       if (data) {
    //         data.body = [];
    //         this.advertService.searchAdvert(data as ICategoryChild);
    //       }
    //     });
    //   });
  }
  //** Получить массив категорий по которым кликал пользователь */
  private _getCategoriesId(): string[] {
    return this.categoryService.getCategoriesId;
  }
  //** Подписываемся на получение объявлений из сервиса полученных после поиска */
  private _initialAdvert(): void {
    this._unsubscribeGetSearch = this.advertService.getAdvertsAfterSearching$.subscribe(
      (data: IAdvertUser[]) => {
        this._addNewAdverts(data);
        console.log(data);
      }
    );
    this._timerLoading();
  }
  //** Добавляем полученные массивы объявлений в общий массив для отображения на странице */
  private _addNewAdverts(data: IAdvertUser[]) {
    data.forEach((elem: IAdvertUser) => {
      // if (this.adverts.filter((el: IAdvertUser) => el.id === elem.id).length === 1) return;
      // elem.categoryId = data.category?.id;
      this.adverts.push(elem);
    });
    console.log(this.adverts);
  }
  //** Таймер Загрузки ожидания */
  private _timerLoading() {
    setTimeout(() => {
      if (this.adverts.length > 0) return;
      else
        this.errorMessage =
          "Слишком большое время ожидания ответа сервера, пожалуйста перезагрузите страницу браузера";
      console.log(this.adverts.length);
    }, 5000);
  }
  // //** Получить хлебные крошки категорий объявления для ссылки */
  // private _initialGetCategoryBreadcrumbs(): void {
  //   this._unsubscribeGetCategoryBreadcrumbs = this.categoryService.getCategoryBreadcrumbs$
  //     .pipe(
  //       tap(data => {
  //         console.log(data);
  //         this.categoryListBreadcrumbs = data;
  //         if (data[0].parentId === this.categoryService.getDefaultId) {
  //           this._createLink();
  //           return;
  //         }
  //         this._fetchCategoryById(data[0].parentId);
  //       })
  //     )
  //     .subscribe();
  // }
  // //** Получаем город сохраненный пользователем из 'LocalStorage' */
  // private _getCity(): string {
  //   console.log(this.queryParamsService.getCity);
  //   return this.queryParamsService.getCity.toLowerCase();
  // }
  // //** Получить объявление из дочернего компонента по которому кликнул пользователь и записать его */
  // onGetAdvertProps(props: { res: IAdvertUser; val: string }): void {
  //   this.categoryListBreadcrumbs = [];
  //   this.advert = props.res;
  //   console.log(props);
  //   if (props.res.categoryId) {
  //     // this._saveCategoryId(props.res.categoryId);
  //     this._fetchCategoryById(props.res.categoryId);
  //   }
  // }
  // // //** сохраняем 'ID' категории объявления по которому кликал пользователь */
  // // private _saveCategoryId(id: string) {
  // //   this.categoryService.saveCategoryId(id);
  // // }
  // //** Получить категорию по 'ID' */
  // private _fetchCategoryById(id: string): void {
  //   console.log(this.categoryListBreadcrumbs);
  //   if (id === this.categoryService.getDefaultId) {
  //     return;
  //   }
  //   this.categoryService.fetchCategoryById(id).subscribe((data: ICategory | null) => {
  //     if (data) {
  //       console.log(data);
  //       this._addCategoryBreadcrumbs(data);
  //     }
  //   });
  // }
  // //** Добавить полученную категорию в массив категорий для  получения хлебных крошек */
  // private _addCategoryBreadcrumbs(data: ICategory): void {
  //   this.categoryService.setCategoryBreadcrumbs([data, ...this.categoryListBreadcrumbs]);
  // }
  // //** Создаем навигационную ссылку для переходя на другую страницу */
  // private _createLink() {
  //   let link = this._getCity() + "/";
  //   console.log(this.categoryListBreadcrumbs);
  //   this.categoryListBreadcrumbs.forEach((elem: ICategory) => {
  //     console.log(elem);
  //     link += elem.name + "/";
  //   });
  //   console.log(link);
  //   console.log(`${this._getCity()}/${link}ad/${this.advert.name}`);
  //   link = this.queryParamsService.transliter(`${link}ad/${this.advert.name}`);
  //   // link = this.queryParamsService.transliter(`${link}advert/${this.advert.name}`);
  //   console.log(link);
  //   this._goTo(link + "_" + this.advert.id);
  //   // this._goTo(link + "_" + this.advert.id);
  // }
  // //** Переходим по ссылке */
  // private _goTo(link: string): void {
  //   console.log(link);
  //   this.router.navigateByUrl(`/${link}`);
  // }
  //** Отписываемся от кастомных подписок */
  ngOnDestroy(): void {
    this._unsubscribeGetSearch.unsubscribe();
    this._unsubscribeGetNewCategoryList.unsubscribe();
    // this._unsubscribeGetCategoryBreadcrumbs.unsubscribe();
  }
}
