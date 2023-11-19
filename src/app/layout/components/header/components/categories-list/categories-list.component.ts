import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AdvertService } from "src/app/shared/services/adverts-service/advert.service";

import { QueryParamsService } from "src/app/shared/services/query-params-service/query-params.service";
import { ICategoryChild } from "src/app/shared/types/category.interface";
// import { EStaticVar } from "src/app/shared/types/staticVar.enum";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.scss"],
})
export class CategoriesListComponent implements OnInit {
  activeMenuCategory!: ICategoryChild;
  numberOfColumns = 3;
  categoryIdColumnCard!: number;
  categoryIdColumnCard2!: number;

  @Output()
  closeMenu = new EventEmitter<boolean>();

  @Input()
  cityProps!: string;
  @Input()
  categoriesProps!: ICategoryChild[];

  constructor(
    private advertService: AdvertService,
    private queryParamsService: QueryParamsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initializeActiveCategory();
  }
  //** Установить начальную активную категорию если еще не установлена */
  private _initializeActiveCategory(): void {
    if (!this.activeMenuCategory) {
      this.activeMenuCategory = this.categoriesProps[0];
      this._getCategoryIdInColumnCard(this.categoriesProps[0]);
    }
  }
  //** Получаем из дочернего компонента активную категорию из меню категорий */
  onActiveMenuCategoryProps(data: ICategoryChild): void {
    this.activeMenuCategory = data;
    this._getCategoryIdInColumnCard(data);
  }
  //** Получить индекс категорий к которым будут применены стили */
  private _getCategoryIdInColumnCard(data: ICategoryChild): void {
    const arrayNumberOfSubcategories: number[] = [];
    const totalNumberOfSubcategories = this._getTotalNumberOfSubcategories(
      data,
      arrayNumberOfSubcategories
    );
    const quantityItemsOneColumn = Math.floor(totalNumberOfSubcategories / this.numberOfColumns);
    this._setIndexCategoryInColumnCart(arrayNumberOfSubcategories, quantityItemsOneColumn);
  }
  //** Получить общее количество под-под категорий *
  private _getTotalNumberOfSubcategories(data: ICategoryChild, arrNum: number[]): number {
    let sum = 0;
    data.childs.forEach(el => {
      if (el.childs && el.childs.length) {
        if (el.childs.length > 6) {
          sum += 6;
          arrNum.push(6);
        } else {
          sum += el.childs.length;
          arrNum.push(el.childs.length);
        }
      } else {
        sum += 2;
        arrNum.push(2);
      }
    });
    return sum;
  }
  //** Устанавливаем индексы категорий к которым будут применены стили (если они будут работать) */
  private _setIndexCategoryInColumnCart(arrNum: number[], quantity: number): void {
    let count = 0;
    let sum = 0;
    arrNum.forEach((elem: number) => {
      count++;
      sum += elem;
      if (sum < quantity) {
        return;
      }
      if (sum >= quantity) {
        if (!this.categoryIdColumnCard) {
          this.categoryIdColumnCard = count;
          sum = 0;
          return;
        } else {
          this.categoryIdColumnCard2 = count;
          sum = 0;
          return;
        }
      }
    });
  }

  //** Получаем ссылку из дочернего компонента для перехода на страницу выбранной категории */
  onGetSubcategoryLinkProps(props: string): void {
    console.log(`${this.activeMenuCategory.name}/${props}`);
    this.onGoTo(`${this.activeMenuCategory.name}/${props}`);
  }
  //** Получаем ссылку из списка основных категорий*/
  onGetCategoryLink(data: ICategoryChild): void {
    this.onGoTo(data.name);
    // this._setCategorySearch(data);
  }
  //** Передать состояние закрыть меню и перейти по ссылке */
  onGoTo(data: string): void {
    this.closeMenu.emit(false);
    this.router.navigateByUrl(
      `/${this.queryParamsService.transliter(this.cityProps + "/" + data)}`
    );
  }
  // private _setCategorySearch(category: ICategoryChild): void {
  //   this.advertService.searchAdvertByCategory(category);
  // }
}
