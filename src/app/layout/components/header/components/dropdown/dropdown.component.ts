import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { IDropdownItem } from "src/app/layout/types/dropdown-item.interface";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
})
export class DropdownComponent {
  @Input()
  dropdownItemsProps!: IDropdownItem[];
  @Input()
  isOpenDropdownProps!: boolean;
  @Input()
  currentUserLoginProps!: string | null;

  @Output()
  isOpenDropdown = new EventEmitter<boolean>();
  @Output()
  dropdownItem = new EventEmitter<IDropdownItem>();

  @HostListener("document:click", ["$event"])
  onClick(event: any): void {
    const t = event.target;
    if (t.name !== "item" && t.classList[3] !== "icon-auth") {
      if (this.isOpenDropdown) {
        this.isOpenDropdown.emit(false);
      }
    }
  }

  onDropdownToggle(): void {
    this.isOpenDropdown.emit(!this.isOpenDropdownProps);
  }
  onGetClickItem(item: IDropdownItem) {
    this.dropdownItem.emit(item);
  }
}
