import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { ICategoryChild } from "src/app/shared/types/category.interface";

@Component({
  selector: "app-categories-body",
  templateUrl: "./categories-body.component.html",
  styleUrls: ["./categories-body.component.scss"],
})
export class CategoriesBodyComponent implements OnInit {
  isMore = false;
  title!: string;
  subcategoryItems!: string[];
  quantity!: number;

  @Output()
  // subcategory = new EventEmitter<{ link: string; category: INewCategro}>();
  subcategoryLink = new EventEmitter<string>();

  @Input()
  subcategoryProps!: ICategoryChild;
  @Input()
  indexProps!: number;
  @Input()
  subcategoryIdColProps!: number;
  @Input()
  subcategoryIdCol2Props!: number;

  ngOnInit(): void {
    this._initializeVisibleCategory();
  }
  //** Устанавливаем количество видимых категорий и кнопку показать еще */
  private _initializeVisibleCategory(): void {
    if (this.subcategoryProps.childs) {
      if (this.subcategoryProps.childs.length <= 6) {
        this._setItems(this.subcategoryProps.childs);
        return;
      }
      this._toggleIsMore(true);
      this._setQuantity(this.subcategoryProps.childs.length);
      this._setItems(this.subcategoryProps.childs.slice(0, 5));
    }
  }
  //** Устанавливаем суб-суб категории  */
  private _setItems(data: ICategoryChild[]): void {
    this.subcategoryItems = data.map((elem: ICategoryChild) => elem.name);
  }
  //** Устанавливаем количество скрытых категории  */
  private _setQuantity(data: number): void {
    this.quantity = data - 5;
    console.log(this.quantity);
  }
  //** Скрыть/Показать категории */
  private _toggleIsMore(isValue: boolean): void {
    this.isMore = isValue;
  }
  //** Показать еще */
  onMoreItems(): void {
    this._toggleIsMore(false);
    if (this.subcategoryProps.childs) {
      this._setItems(this.subcategoryProps.childs);
    }
  }
  //** Получаем ссылку для перехода на страницу выбранной категории и передаем в родительский компонент */
  onGetSubcategoryLink(arg0: string, arg1: string | null = null): void {
    console.log("subcategory: ", arg0, "item: ", arg1);
    let str = `${arg0}`;
    if (arg1) {
      str = `${arg0}/${arg1}`;
    }
    this.subcategoryLink.emit(str);
    // this.subcategoryLink.emit({link: str, category: });
  }
}
