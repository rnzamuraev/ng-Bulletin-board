import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { ICategory } from "src/app/shared/types/category.interface";

@Component({
  selector: "app-form-dropdown",
  templateUrl: "./form-dropdown.component.html",
  styleUrls: ["./form-dropdown.component.scss"],
})
export class FormDropdownComponent implements OnInit {
  selectedCategory!: ICategory | null;
  categoriesProps!: ICategory[];
  indexProps!: number;
 
  @Input("categoryProps")
  set setCategories(props: { categories: ICategory[]; i: number }) {
    if (!props.categories) return;

    console.log(props.i);
    if (this.indexProps === undefined) {
      console.log(this.indexProps);
      this.categoriesProps = props.categories;
      this.indexProps = props.i;
    }
  }
  @Input("isResetDropdownProps")
  set setIsResetDropdown(props: boolean) {
    console.log(props);
    if (props) {
      this.selectedCategory = null;
      console.log(this.selectedCategory);
      setTimeout(() => {
        this.isResetDropdown.emit(false);
      }, 0);
    }
  }

  @Output()
  selectCategory = new EventEmitter<ICategory | null>();
  @Output()
  isNewCategoryField = new EventEmitter<boolean>();
  @Output()
  isResetDropdown = new EventEmitter<boolean>();
  // @Output()
  // clearDropdown = new EventEmitter<(() => void) | undefined>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    // this._clearDropdown();
  }
  // private _clearDropdown() {
  //   this.clearDropdown.emit(this.onClearDropdown);
  // }
  onSelectedCategory(category: ICategory | null) {
    console.log(category);
    this.selectCategory.emit(category);
  }
  onClearDropdown() {
    this.selectedCategory = null;
    this.onSelectedCategory(null);
  }
}
