import { Component, ElementRef, EventEmitter, Input, Output } from "@angular/core";
import { IFormFilter } from "src/app/pages/main/types/form-filter.interface";

import { ICategoryChild } from "src/app/shared/types/category.interface";

@Component({
  selector: "app-filter-sidebar",
  templateUrl: "./filter-sidebar.component.html",
  styleUrls: ["./filter-sidebar.component.scss"],
})
export class FilterSidebarComponent {
  inputMinCost!: ElementRef<HTMLInputElement>;
  inputMaxCost!: ElementRef<HTMLInputElement>;

  @Output()
  routerLink = new EventEmitter<string>();
  @Output()
  submitFormFilter = new EventEmitter<IFormFilter>();

  @Input()
  categoriesProps!: ICategoryChild[];
  @Input()
  activeItemProps!: string;
  @Input()
  activeCategoryProps!: string;
  @Input()
  activeSubcategoryProps!: string;
  @Input()
  searchParamsProps!: { min: string; max: string };

  onGetInputElementMinProps(props: ElementRef<HTMLInputElement>) {
    this.inputMinCost = props;
    console.log(props);
  }
  onGetInputElementMaxProps(props: ElementRef<HTMLInputElement>) {
    this.inputMaxCost = props;
    console.log(props);
  }
  onShowCategories(category: string, val: string = "") {
    if (val === "sub") {
      console.log("sub: ", category);
      console.log("sub: ", this.activeSubcategoryProps);
      if (category === this.activeSubcategoryProps) {
        this.activeSubcategoryProps = "";
        return;
      }
      this.activeSubcategoryProps = category;
      return;
    }
    if (category === this.activeCategoryProps) {
      this.activeCategoryProps = "";
      this.activeSubcategoryProps = "";
      return;
    }
    this.activeCategoryProps = category;
  }

  onGoTo(route: string, id: string) {
    if (id === this.activeItemProps) return;
    console.log(route);
    this.routerLink.emit(route);
  }

  onSetFilterFromTo() {
    if (
      this.inputMinCost.nativeElement.value.replace(/\D/g, "") === this.searchParamsProps.min &&
      this.inputMaxCost.nativeElement.value.replace(/\D/g, "") === this.searchParamsProps.max
    )
      return;
    this.submitFormFilter.emit({
      min: this.inputMinCost.nativeElement.value.replace(/\D/g, ""),
      max: this.inputMaxCost.nativeElement.value.replace(/\D/g, ""),
    });
  }
}
