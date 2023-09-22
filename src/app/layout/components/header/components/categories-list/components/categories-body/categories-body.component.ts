import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { ICategory, ISubCategoryMenu } from "src/app/shared/types/category.interface";

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

  @Input()
  subcategoryProps!: ISubCategoryMenu;

  @Input()
  subcategoryIdColProps!: number;

  @Input()
  subcategoryIdCol2Props!: number;

  @Output()
  getSubcategoryLink = new EventEmitter<string>();

  ngOnInit(): void {
    this.setTitle();
    this.initializeVariables(this.subcategoryProps);
  }

  private initializeVariables(data: ISubCategoryMenu): void {
    if (data.body) {
      if (data.body.length <= 6) {
        this.setItems(data.body);
        return;
      }

      this.isMore = true;
      this.setQuantity(data.body.length);
      this.setItems(data.body.slice(0, 5));
    }
  }

  private setItems(data: ICategory[]): void {
    console.log(data);
    data.forEach((elem: ICategory) => {
      console.log(elem);
      this.subcategoryItems.push(elem.category);
    });
    console.log(this.subcategoryItems);
  }
  private setTitle(): void {
    this.title = this.subcategoryProps.category;
  }
  private setQuantity(data: number): void {
    this.quantity = data - 5;
  }

  onMoreItems(): void {
    this.isMore = false;
    if (this.subcategoryProps.body) {
      this.setItems(this.subcategoryProps.body);
    }
  }

  onGetSubcategoryLink(arg0: string, arg1: string | null = null): void {
    console.log("subcategory: ", arg0, "item: ", arg1);
    let str = `${arg0}`;
    if (arg1) {
      str = `${arg0}/${arg1}`;
    }

    this.getSubcategoryLink.emit(str);
  }
}
