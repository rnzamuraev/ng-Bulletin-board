import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-all-categories",
  templateUrl: "./all-categories.component.html",
  styleUrls: ["./all-categories.component.scss"],
})
export class AllCategoriesComponent {
  public isOpenMenu = false;
  @Input()
  public categories!: string[];
  @Output()
  public searchText = new EventEmitter<string>();

  onOpenMenu(): void {
    this.isOpenMenu = !this.isOpenMenu;
  }

  public onSubmitSearchText(data: NgForm): void {
    this.searchText.emit(data.value.search);
  }
}
