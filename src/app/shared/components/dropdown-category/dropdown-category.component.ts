// import { Component, EventEmitter, Input, Output } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { DropdownModule } from "primeng/dropdown";

// import { ICategory } from "../../types/category.interface";
// import { CategoryService } from "../../services/category-service/category.service";

// @Component({
//   selector: "app-dropdown-category",
//   templateUrl: "./dropdown-category.component.html",
//   styleUrls: ["./dropdown-category.component.scss"],
//   standalone: true,
//   imports: [CommonModule, DropdownModule, FormsModule],
// })
// export class DropdownCategoryComponent {
//   selectedCategory!: ICategory | null;
//   categoriesProps!: ICategory[];
//   indexProps!: number;

//   @Input("categoryProps")
//   set setCategories(props: { categories: ICategory[]; i: number }) {
//     if (!props.categories) return;

//     console.log(props.i);
//     if (this.indexProps === undefined) {
//       console.log(this.indexProps);
//       this.categoriesProps = props.categories;
//       this.indexProps = props.i;
//     }
//   }
//   @Input("isResetDropdownProps")
//   set setIsResetDropdown(props: boolean) {
//     console.log(props);
//     if (props) {
//       this.selectedCategory = null;
//       console.log(this.selectedCategory);
//       setTimeout(() => {
//         this.isResetDropdown.emit(false);
//       }, 0);
//     }
//   }

//   @Output()
//   selectCategory = new EventEmitter<ICategory | null>();
//   @Output()
//   isNewCategoryField = new EventEmitter<boolean>();
//   @Output()
//   isResetDropdown = new EventEmitter<boolean>();
//   @Output()
//   clearDropdown = new EventEmitter<(() => void) | undefined>();

//   constructor(private categoryService: CategoryService) {}

//   ngOnInit(): void {
//     // this._clearDropdown();
//   }
//   onSelectedCategory(category: ICategory | null) {
//     console.log(category);
//     this.selectCategory.emit(category);
//   }
//   onClearDropdown() {
//     this.selectedCategory = null;
//     this.onSelectedCategory(null);
//   }
// }
