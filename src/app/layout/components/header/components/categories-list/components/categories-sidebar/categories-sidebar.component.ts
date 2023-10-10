import { Component, EventEmitter, Input, Output } from "@angular/core";
import { INewCategory } from "src/app/shared/types/category.interface";

@Component({
  selector: "app-categories-sidebar",
  templateUrl: "./categories-sidebar.component.html",
  styleUrls: ["./categories-sidebar.component.scss"],
})
export class CategoriesSidebarComponent {
  @Input()
  activeMenuCategoryProps!: INewCategory;

  @Input()
  categoriesProps!: INewCategory[];

  @Output()
  setActiveMenuCategory = new EventEmitter<INewCategory>();

  onGetActiveMenuCategory(data: INewCategory): void {
    if (data !== this.activeMenuCategoryProps) {
      this.setActiveMenuCategory.emit(data);
    }
  }
}
