import { Component, EventEmitter, Input, Output } from "@angular/core";

import { ISubCategoryMenu } from "src/app/layout/types/category.interface";

@Component({
  selector: "app-category-items",
  templateUrl: "./category-items.component.html",
  styleUrls: ["./category-items.component.scss"],
})
export class CategoryItemsComponent {
  public subcategory!: ISubCategoryMenu;

  public isMore = false;
  public title!: string;
  public items!: string[];
  public quantity!: number;

  @Output()
  getSubcategoryLink = new EventEmitter<string>();

  @Input()
  subcategoryIdColProps!: number;
  @Input()
  subcategoryIdCol2Props!: number;

  @Input("subcategoryProps")
  set setIsMore(props: ISubCategoryMenu) {
    console.log(props);
    this.subcategory = props;
    this.setTitle(props.subcategory);

    if (props.body) {
      if (props.body.length <= 6) {
        this.items = props.body;
        return;
      }

      this.isMore = true;
      this.setItems(props.body);
      this.setQuantity(props.body.length);
    }
  }

  private setItems(data: string[]): void {
    this.items = data.slice(0, 5);
  }
  private setTitle(data: string): void {
    this.title = data;
  }
  private setQuantity(data: number): void {
    this.quantity = data - 5;
  }

  public onMoreItems(): void {
    this.isMore = false;
    if (this.subcategory.body) this.items = this.subcategory.body;
  }

  public onGetSubcategoryLink(arg0: string, arg1: string | null = null): void {
    console.log("subcategory: ", arg0, "item: ", arg1);
    let str = `${arg0}`;
    if (arg1) {
      str = `${arg0}/${arg1}`;
    }

    this.getSubcategoryLink.emit(str);
  }
}
