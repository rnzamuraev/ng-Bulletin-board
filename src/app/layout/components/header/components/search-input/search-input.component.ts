import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
})
export class SearchInputComponent {
  @Output()
  term = new EventEmitter<string>();
  @Output()
  closeMenu = new EventEmitter<boolean>();

  @Input()
  termProps!: string;

  onSubmitTerm(e: Event, data: NgForm): void {
    // console.log(e);
    // console.log(e.target);
    const target = e.target as HTMLInputElement;
    if (data.value.search === this.termProps) return;
    if (e.type === "blur") {
      if (data.value.search !== this.termProps) {
        setTimeout(() => {
          if (e.type === "submit") return;
          target.value = this.termProps;
        }, 500);
      }
      return;
    }
    // console.log(data.value.search);
    this._closeMenu();
    this.term.emit(data.value.search);
  }
  private _closeMenu() {
    this.closeMenu.emit(false);
  }
}
