import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

import { BASE_URL } from "src/app/config.API";
import { CustomCurrencyPipe } from "../../pipes/custom-currency/custom-currency.pipe";
import { AdvertService } from "../../services/adverts-service/advert.service";
import { CategoryService } from "../../services/category-service/category.service";
import { QueryParamsService } from "../../services/query-params-service/query-params.service";
import { IAdvertUser } from "../../types/adverts.interface";
import { ICategory } from "../../types/category.interface";
import { NoImageComponent } from "../no-image/no-image.component";
import { mergeMap, of } from "rxjs";
import { CustomDatePipe } from "../../pipes/custom-date/custom-date.pipe";

@Component({
  selector: "app-card-product",
  templateUrl: "./card-product.component.html",
  styleUrls: ["./card-product.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterModule, NoImageComponent, CustomCurrencyPipe, CustomDatePipe],
})
export class CardProductComponent implements OnInit, OnDestroy {
  // private _unGetCategoriesForLink!: Subscription;
  isDelete = false;
  image!: string;
  advertProps!: IAdvertUser;
  categoriesForLink!: ICategory[];

  @Input("advertProps")
  set setAdvert(props: IAdvertUser) {
    this.advertProps = props;
    if (props.imagesIds.length > 0) this._initialCreateImageUrl(props.imagesIds[0]);
  }
  @Input()
  routerLinkTitlesProps!: string;
  @Input()
  isEditProps!: boolean;

  @Output()
  deleteAdvert = new EventEmitter<string>();

  constructor(
    private categoryService: CategoryService,
    private queryParamsService: QueryParamsService,
    private advertService: AdvertService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // this._initialGetAdCategoryForLink();
  }
  //** Создаем 'Url' ссылки для получения картинок с сервера */
  private _initialCreateImageUrl(id: string) {
    this.image = `url(${BASE_URL}/images/${id})`;
    console.log(this.image);
  }
  //**********************************! */
  // //** Подписываемся на получение категорий объявления для создания ссылки */
  // private _initialGetAdCategoryForLink(): void {
  //   this._unGetCategoriesForLink = this.categoryService.getCategoriesForLink$.subscribe(data => {
  //     this.categoriesForLink = data;
  //     if (data[0].parentId === this.categoryService.getDefaultId) {
  //       console.log(data);
  //       // this._createLink();
  //       return;
  //     }
  //     console.log(data);
  //     this._fetchCategoryById(data[0].parentId);
  //   });
  // }
  //** Получаем Объявление по которому кликнул пользователь (Карточка товара) */
  onGetAdvert(advert: IAdvertUser, arg: string) {
    console.log(advert);
    this.categoriesForLink = [];
    if (arg === "delete") {
      this.deleteAdvert.emit(advert.id);
      this.onToggleIsDelete(false);
      return;
    }
    if (arg === "info") {
      this.advertService.fetchAdvertById(advert.id).subscribe(data => {
        if (data) this._fetchCategoryById(data.category?.id);
      });
      return;
    }
    if (arg === "edit") {
      console.log("EDIT");
      this.advertService.setIsEdit(true);
      this._goTo(
        `lk/my-items/edit/${this.queryParamsService.transliter(advert.name)}_${advert.id}`
      );
    }
  }
  // private _deleteAdvert(id: string) {
  //   this.advertService
  //     .deleteAdvert(id)
  //     .pipe(
  //       tap(data => {
  //         if (data === null) {
  //           this._fetchCurrentUserById();
  //         }
  //       })
  //     )
  //     .subscribe(data => {
  //       console.log(data);
  //     });
  // }
  // // ** Получаем пользователя по ID после удаления объявления и заносим данные в сервис */
  // private _fetchCurrentUserById(): void {
  //   if (this.currentUser) {
  //     // console.log(id);
  //     return this.userService.fetchUserById(this.currentUser.id).subscribe((data: IUser | null) => {
  //       console.log(data);
  //       this.userService.setCurrentUser(data);
  //     });
  //   }
  // }
  private _fetchCategoryByIdA(id: string) {
    return this.categoryService.fetchCategoryById(id);
  }
  //** Получить категорию по 'ID' */
  private _fetchCategoryById(id: string): void {
    console.log(id);
    this._fetchCategoryByIdA(id).subscribe(data => {
      console.log(id);
      console.log(data);
      if (data) {
        this._addCategoryInCategoriesForLink(data);
        if (data.parentId === this.categoryService.getDefaultId) {
          this._createLink();
          console.log(this.categoryService.getDefaultId);
          return;
        }
        console.log(data);
        this._fetchCategoryById(data.parentId);
      }
    });
  }
  //** Добавить полученную категорию в массив категорий для получения ссылки маршрута до страницы 'Advert Info' */
  private _addCategoryInCategoriesForLink(data: ICategory): void {
    console.log(data);
    // this.categoryService.setCategoriesForLink([data, ...this.categoriesForLink]);
    this.categoriesForLink.unshift(data);
    console.log(this.categoriesForLink);
  }
  //** Создаем навигационную ссылку для переходя на другую страницу */
  private _createLink() {
    let link = `info/${this.advertProps.name}`;
    // let link = this._getCity() + "/";
    // console.log(this.categoryListBreadcrumbs);
    // this.categoriesForLink.forEach((elem: ICategory) => {
    //   console.log(elem);
    //   link += elem.name + "/";
    // });
    console.log(link);
    console.log(`info/${this.advertProps.name}`);
    link = this.queryParamsService.transliter(`${link}`);
    // link = this.queryParamsService.transliter(`${link}advert/${this.advert.name}`);
    console.log(link);
    this._goTo(link + "_" + this.advertProps.id);
  }
  //** Получаем город сохраненный пользователем из 'LocalStorage' */
  private _getCity(): string {
    console.log(this.queryParamsService.getCity);
    return this.queryParamsService.getCity;
  }
  //** Переходим по ссылке */
  private _goTo(link: string): void {
    console.log(link);
    this.router.navigateByUrl(`/${link}`);
  }
  onToggleIsDelete(isValue: boolean) {
    this.isDelete = isValue;
  }
  ngOnDestroy(): void {
    // this._unGetCategoriesForLink.unsubscribe();
  }
}
