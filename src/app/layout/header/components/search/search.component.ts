import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Output()
  public getSearchText = new EventEmitter<string>();

  public onSubmitSearchText(data: NgForm) {
    this.getSearchText.emit(data.value.search);
  }
}
