import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";

@Component({
  selector: "app-input-field-error",
  templateUrl: "./input-field-error.component.html",
  styleUrls: ["./input-field-error.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class InputFieldErrorComponent {
  @Input()
  errorsMessageProps!: string[];
  @Input()
  // formControlsStringProps!: FormControl<string | null>;
  controlsStringProps!: AbstractControl;
  @Input()
  controlsNumberProps!: FormControl<number | null>;
  @Input()
  errorMessageProps!: string;
  // asdf: AbstractControl = this.formControlsStringProps;
}
