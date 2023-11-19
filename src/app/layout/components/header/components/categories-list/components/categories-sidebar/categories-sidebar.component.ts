import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ICategoryChild } from "src/app/shared/types/category.interface";

@Component({
  selector: "app-categories-sidebar",
  templateUrl: "./categories-sidebar.component.html",
  styleUrls: ["./categories-sidebar.component.scss"],
})
export class CategoriesSidebarComponent {
  @Output()
  activeMenuCategory = new EventEmitter<ICategoryChild>();

  @Input()
  activeMenuCategoryProps!: ICategoryChild;
  @Input()
  categoriesProps!: ICategoryChild[];
  //** Получить активную категорию */
  onGetActiveMenuCategory(data: ICategoryChild): void {
    if (data !== this.activeMenuCategoryProps) {
      this.activeMenuCategory.emit(data);
    }
  }
}
