import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { BASE_URL } from "src/app/config.API";
import { AdvertService } from "src/app/shared/services/adverts-service/advert.service";
import { BreadcrumbsService } from "src/app/shared/services/breadcrumbs-service/breadcrumbs.service";
import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { ErrorMessageService } from "src/app/shared/services/error-message-service/error-message.service";
import { OpenService } from "src/app/shared/services/open-service/open.service";
import { QueryParamsService } from "src/app/shared/services/query-params-service/query-params.service";
import { IAdvertById } from "src/app/shared/types/adverts.interface";
import { IBreadcrumbs } from "src/app/shared/types/breadcrumbs.interface";
import { ICategory } from "src/app/shared/types/category.interface";

@Component({
  selector: "app-product-info-page",
  templateUrl: "./product-info-page.component.html",
  styleUrls: ["./product-info-page.component.scss"],
})
export class ProductInfoPageComponent implements OnInit, OnDestroy {
  private _unGetAdvert!: Subscription;
  private _breadcrumbs!: IBreadcrumbs[];
  private _categoriesForBr!: ICategory[];
  private _breadcrumbsItem!: IBreadcrumbs;

  isNotFoundPage!: boolean;
  isPhone = false;
  advert!: IAdvertById;
  advertId!: string;
  imagesLink!: string[];
  btnText = "";
  routerLink!: string;
  map!: string;
  index = 0;
  bgImg!: string;
  imagesLinkBg!: string[];
  breadcrumbs!: IBreadcrumbs[];

  constructor(
    private router: Router,
    // private activatedRoute: ActivatedRoute,
    private breadcrumbsService: BreadcrumbsService,
    private queryParamsService: QueryParamsService,
    private advertService: AdvertService,
    private categoryService: CategoryService,
    private errorMessageService: ErrorMessageService,
    private openService: OpenService
  ) {
    // this._toggleIsInfoPage(true);
    this._initialIsNotFound();
    // this._initializeUrlParams();
    // this._initializeAdvertId();
  }
  // //** Переключатель режимов страницы видна или нет */
  // private _toggleIsInfoPage(isValue: boolean) {
  //   this.queryParamsService.setIsLoadingInfoPage(isValue);
  // }

  // ** Получаем 'Url' текущей страницы и преобразуем в массив ссылок для роутинга */
  // private _getUrlRouts(): string[] {
  //   return this.router.routerState.snapshot.url.split("/");
  //   }
  //** Получаем 'ID' объявления из полученного 'Url' */
  // private _initializeAdvertId(): void {
  //   this.activatedRoute.params.subscribe((data: Params) => {
  //     this._getProductId(data["info"].split("_").slice(-1)[0]);
  //   });
  // }

  ngOnInit(): void {
    this._initialGetAdvert();
    // this._setBtnText();
  }
  // //** Подписываемся на изменения 'Params' */
  // private _initializeUrlParams() {
  //   this.activatedRoute.params.subscribe((data: Params) => {
  //     console.log(data);
  //     console.log(data["subcategory"]);
  //   });
  //   const sub = this.activatedRoute.snapshot.params["subcategory"];
  //   console.log(sub);
  //   console.log(this.activatedRoute.snapshot.params);
  // }
  //** Подписываемся на изменения статуса 'Not Found' */
  private _initialIsNotFound() {
    this.errorMessageService.getIsNotFoundPage.subscribe((isData: boolean) => {
      console.log(isData);
      this.isNotFoundPage = isData;
    });
  }
  //** получаем объявление по 'ID' */
  private _initialGetAdvert(): void {
    // this.advertService.fetchAdvertById(id).subscribe((data: IAdvertById | null) => {
    this._unGetAdvert = this.advertService.getAdvert$.subscribe((data: IAdvertById | null) => {
      if (data) {
        this.advert = data;
        this._initialParams(data.name);
        this._getImagesLink(data.imagesIds);
        // this._setLocationMap(data.location);
        this._getCategoryName(data.category);
        this._saveCategoryId(data.category.id);
      }
      console.log(data);
    });
  }
  //**  */
  private _initialParams(name: string) {
    this._breadcrumbs = [];
    this._categoriesForBr = [];
    this._breadcrumbsItem = {
      label: name,
      link: "info",
      category: null,
    };
  }
  //** Получаем массив ссылок для отображения картинок */
  private _getImagesLink(imagesIds: string[]): void {
    this.imagesLinkBg = [];
    this.imagesLink = imagesIds.map((elem: string) => {
      this.imagesLinkBg.push(`url(${BASE_URL}/images/${elem})`);
      return `${BASE_URL}/images/${elem}`;
    });
    this._setBgImg(0);
    console.log(this.imagesLink);
  }
  //** Устанавливаем картинку для заднего фона */
  private _setBgImg(index: number) {
    this.bgImg = `url(${this.imagesLink[index]})`;
    console.log(this.imagesLink[index]);
    console.log(this.bgImg);
  }
  //**? Устанавливаем ссылку для открытия адреса на карте */
  private _setLocationMap(value: string) {
    console.log(this.queryParamsService.transliter(value));
    const urlStart = "https://yandex.ru/maps/959/sevastopol/house/";
    const urlEnd = "/Z0oYcwRiTEwGQFpufXl0eHxrYQ==/?ll=";
    this.map = `${urlStart}${this.queryParamsService.transliter(value)}${urlEnd}`;
  }

  //** Добавляем в массив хлебных крошек информацию данной страницы */childs
  private _getCategoryName(category: ICategory) {
    this._categoriesForBr.unshift(category);
    if (category.parentId === this.categoryService.getDefaultId) {
      this._setBreadcrumbsLink();
      this._setBreadcrumbsInService();
      return;
    }
    this.categoryService
      .fetchCategoryById(category.parentId)
      .subscribe((data: ICategory | null) => {
        if (data) this._getCategoryName(data);
      });
  }
  private _setBreadcrumbsLink() {
    // const  = this._breadcrumbs[0]
    let link = this.queryParamsService.getCity;
    this._categoriesForBr.forEach((elem: ICategory) => {
      link += `/${this.queryParamsService.transliter(elem.name)}`;
      this._setBreadcrumbsItem(elem.name, link);
    });
    this._setBreadcrumbsItem(this._breadcrumbsItem.label, this._breadcrumbsItem.link);
    console.log(this._breadcrumbs);
  }
  //** Создаем и добавляем элемент в массив хлебных крошек */
  private _setBreadcrumbsItem(label: string, link: string) {
    this._breadcrumbs.push({
      label,
      link,
      category: null,
    });
  }
  //** передаем готовый массив хлебных крошек в сервис */
  private _setBreadcrumbsInService() {
    this.breadcrumbsService.setBreadcrumbs(this._breadcrumbs);
  }
  //** сохраняем 'ID' категории объявления по которому кликал пользователь */
  private _saveCategoryId(id: string) {
    this.categoryService.saveCategoryId(id);
  }
  //** Задаем активную картинку по клику на миниатюру */
  onChangeActiveImg(i: number): void {
    this.index = i;
    this._setBgImg(i);
  }
  //** Показать номер пользователя по клюку на кнопку */
  onShowPhone(): void {
    this.openService.openPhone();
  }
  //** Переводим режим отображения страницы в неактивный */
  ngOnDestroy(): void {
    this._unGetAdvert.unsubscribe();
    // this._toggleIsInfoPage(false);
  }
}
