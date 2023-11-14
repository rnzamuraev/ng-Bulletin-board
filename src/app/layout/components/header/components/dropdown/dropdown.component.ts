import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { IDropdownItem } from "src/app/layout/types/dropdown-item.interface";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
})
export class DropdownComponent {
  @Output()
  isOpenDropdown = new EventEmitter<boolean>();
  @Output()
  dropdownItem = new EventEmitter<IDropdownItem>();

  @Input()
  dropdownItemsProps!: IDropdownItem[];
  @Input()
  isOpenDropdownProps!: boolean;
  @Input()
  currentUserLoginProps!: string;

  @HostListener("document:click", ["$event"])
  onClick(event: PointerEvent): void {
    const t = event.target as HTMLElement;
    if (t.classList[1] !== "dropdown-item" && t.classList[3] !== "icon-auth") {
      if (this.isOpenDropdown) {
        this.isOpenDropdown.emit(false);
      }
    }
  }
  //** Изменяем состояние пришедшего значения 'Dropdown' Открыто/Закрыто на противоположное */
  onDropdownToggle(): void {
    this.isOpenDropdown.emit(!this.isOpenDropdownProps);
  }
  //** Получить кнопку-ссылку по которой был совершен клик */
  onGetClickItem(item: IDropdownItem): void {
    this.dropdownItem.emit(item);
  }
}
