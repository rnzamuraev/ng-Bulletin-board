import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { IFormFilter } from "src/app/pages/main/types/form-filter.interface";

import { ICategoryChild } from "src/app/shared/types/category.interface";

@Component({
  selector: "app-filter-sidebar",
  templateUrl: "./filter-sidebar.component.html",
  styleUrls: ["./filter-sidebar.component.scss"],
})
export class FilterSidebarComponent {
  @Output()
  routerLink = new EventEmitter<string>();
  @Output()
  submitFormFilter = new EventEmitter<IFormFilter>();
  // @Output()
  // activeItem = new EventEmitter<IFormFilter>();
  minCostProps!: string;
  maxCostProps!: string;

  @Input()
  categoriesProps!: ICategoryChild[];
  @Input()
  activeItemProps!: string;
  @Input()
  activeCategoryProps!: string;
  @Input()
  activeSubcategoryProps!: string;
  @Input()
  // termProps!: string;
  // @Input()
  // minCostProps!: string;
  // @Input()
  // maxCostProps!: string;
  @Input()
  searchParamsProps!: { min: string; max: string };
  onGetCostMinProps(props: string) {
    this.minCostProps = props;
    // form.form.min=props
    console.log(props);
  }
  onGetCostMaxProps(props: string) {
    this.maxCostProps = props;
    // form.form.min=props
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
    console.log(this.minCostProps);
    console.log(this.maxCostProps);
    // console.log(form.form.value);
    this.submitFormFilter.emit({ min: this.minCostProps, max: this.maxCostProps });
  }
}
