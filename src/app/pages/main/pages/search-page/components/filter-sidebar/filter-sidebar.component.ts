import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { IFormFilter } from "src/app/pages/main/types/form-filter.interface";

import { ICategoryMenu } from "src/app/shared/types/category.interface";

@Component({
  selector: "app-filter-sidebar",
  templateUrl: "./filter-sidebar.component.html",
  styleUrls: ["./filter-sidebar.component.scss"],
})
export class FilterSidebarComponent {
  @Input()
  categoriesProps!: ICategoryMenu[];
  @Input()
  activeCategoryProps!: string;
  @Input()
  activeSubcategoryProps!: string;
  @Output()
  getRouterLink = new EventEmitter<string>();
  @Output()
  submitFormFilter = new EventEmitter<IFormFilter>();

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

  onGoTo(str: string) {
    this.getRouterLink.emit(str);
  }

  onSetFilterFromTo(form: NgForm) {
    console.log(form.form.value);
    this.submitFormFilter.emit(form.form.value);
  }
}