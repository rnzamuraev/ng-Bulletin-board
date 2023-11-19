import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-button-submit",
  templateUrl: "./button-submit.component.html",
  styleUrls: ["./button-submit.component.scss"],
  standalone: true,
  // imports: [CommonModule],
})
export class ButtonSubmitComponent {
  // isSubmitting = false;
  @Input()
  isSubmittingProps!: boolean;
  @Input()
  contentProps!: string;
  @Input()
  formProps!: FormGroup;

  // //** Включить/Отключить кнопку во время отправки формы */
  // private _setIsSubmitting() {
  //   this.isSubmitting = !this.isSubmitting;
  // }
  onSubmit() {
    // if (this.formProps.invalid || this.isSubmitting) return;
  }
}
