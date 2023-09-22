import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ICategoryMenu } from "src/app/shared/types/category.interface";

@Component({
  selector: "app-categories-sidebar",
  templateUrl: "./categories-sidebar.component.html",
  styleUrls: ["./categories-sidebar.component.scss"],
})
export class CategoriesSidebarComponent {
  @Input()
  activeMenuCategoryProps!: ICategoryMenu;

  @Input()
  categoriesProps!: ICategoryMenu[];

  @Output()
  setActiveMenuCategory = new EventEmitter<ICategoryMenu>();

  onGetActiveMenuCategory(data: ICategoryMenu): void {
    if (data !== this.activeMenuCategoryProps) {
      this.setActiveMenuCategory.emit(data);
    }
  }
}
