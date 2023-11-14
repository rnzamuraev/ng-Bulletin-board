import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ICategoryChild } from "src/app/shared/types/category.interface";

@Component({
  selector: "app-sort",
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.scss"],
})
export class SortComponent implements OnInit {
  selectedCategory!: { name: string } | null;
  options!: { name: string }[];

  @Output()
  selectCategory = new EventEmitter<{ name: string } | null>();

  @Input()
  quantityProps!: number;
  @Input("sortProps")
  set sortProps(props: string) {
    this._initialSetOptions();
    if (props)
      this.selectedCategory = this.options.filter(
        (elem: { name: string }) => elem.name.toLowerCase() === props
      )[0];
    else this.selectedCategory = null;
  }

  ngOnInit(): void {
    // ;
  }

  private _initialSetOptions() {
    this.options = [
      // { name: "По умолчанию" },
      { name: "Дешевле" },
      { name: "Дороже" },
      { name: "По дате" },
    ];
  }
  onSelectedCategory(category: { name: string } | null) {
    this.selectCategory.emit(category);
    console.log(category);
    console.log(this.selectedCategory);
  }
  onClearDropdown() {
    this.selectedCategory = null;
    this.onSelectedCategory(null);
  }
}
