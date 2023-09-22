import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
})
export class SearchInputComponent {
  @Output()
  getSearchText = new EventEmitter<string>();

  onSubmitSearchText(data: NgForm): void {
    this.getSearchText.emit(data.value.search);
  }
}
