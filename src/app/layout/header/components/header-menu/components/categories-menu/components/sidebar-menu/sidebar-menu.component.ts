import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ICategoryMenu } from "src/app/layout/types/category.interface";

@Component({
  selector: "app-sidebar-menu",
  templateUrl: "./sidebar-menu.component.html",
  styleUrls: ["./sidebar-menu.component.scss"],
})
export class SidebarMenuComponent {
  @Input()
  public activeMenuCategoryProps!: ICategoryMenu;

  @Input()
  public categoriesProps!: ICategoryMenu[];

  @Output()
  public setActiveMenuCategory = new EventEmitter<ICategoryMenu>();

  public onGetActiveMenuCategory(data: ICategoryMenu): void {
    if (data !== this.activeMenuCategoryProps) {
      this.setActiveMenuCategory.emit(data);
    }
  }
}
