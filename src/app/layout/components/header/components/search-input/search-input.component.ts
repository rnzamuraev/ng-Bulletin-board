import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
})
export class SearchInputComponent {
  @Input()
  termProps!: string;
  @Output()
  getTerm = new EventEmitter<string>();

  onSubmitTerm(data: NgForm): void {
    if (data.value.search === this.termProps) return
    console.log(data.value.search);
    this.getTerm.emit(data.value.search);
  }
}
