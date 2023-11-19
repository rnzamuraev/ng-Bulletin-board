import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ISettingsFormSubmit } from "src/app/pages/lk/types/advert-form.interface";
import { INewUser } from "src/app/pages/lk/types/user.interface";
import { ErrorMessageService } from "src/app/shared/services/error-message-service/error-message.service";
import { FormService } from "src/app/shared/services/form-service/form.service";
import { IAuthRegister } from "src/app/shared/types/auth.interface";

@Component({
  selector: "app-password-form",
  templateUrl: "./password-form.component.html",
  styleUrls: ["./password-form.component.scss"],
})
export class PasswordFormComponent implements OnInit {
  form!: FormGroup;
  // errorMessage!: string;
  // backErrorMessage!: string;
  errorMessagePass!: string;
  errorMessageNewPass!: string;
  passInput!: ElementRef<HTMLInputElement>;
  newPassInput!: ElementRef<HTMLInputElement>;

  @Output()
  paramsUser = new EventEmitter<ISettingsFormSubmit>();
  @Output()
  isSubmitting = new EventEmitter<boolean>();
  @Output()
  isSuccessSubmit = new EventEmitter<boolean>();

  @Input()
  isSubmittingProps!: boolean;
  @Input()
  newCurrentUserProps!: INewUser;
  @Input()
  errorMessageProps!: string | null;
  @Input("isSuccessSubmitProps")
  set setIsSuccessSubmit(props: boolean) {
    if (props) {
      this._resetForm();
      this.isSuccessSubmit.emit(false);
    }
  }

  constructor(private errorMessageService: ErrorMessageService, private formService: FormService) {}

  ngOnInit(): void {
    this._initializeForm();
  }

  //**? При загрузке страницы */
  //** Создаем форму изменения пароля */
  private _initializeForm() {
    this.form = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24),
      ]),
      newPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24),
        // Validators.pattern(/^(?=.*[\d])(?=.*[A-ZА-ЯЁ])[^+},"=\]>.№{|?`^*;'~[/<):\\_(-]{8,}$/),
        Validators.pattern(/^(?=.*[\d])(?=.*[A-ZА-ЯЁ])[^ ]{2,}$/),
      ]),
    });
  }
  //** Получаем 'HTMLInputElement' из дочернего компонента */
  onGetPassInputProps(props: ElementRef<HTMLInputElement>) {
    this.passInput = props;
  }
  //** Получаем 'HTMLInputElement' из дочернего компонента */
  onGetNewPassInputProps(props: ElementRef<HTMLInputElement>) {
    this.newPassInput = props;
  }
  //** Получаем пароль из дочернего компонента */
  onGetPasswordProps(props: string) {
    console.log(props);
    this._patchFormControl({ password: props });
    this._setErrorMessage("password", props);
  }
  //** Получаем пароль из дочернего компонента */
  onGetNewPasswordProps(props: string) {
    console.log(props);
    this._patchFormControl({ newPassword: props });
    this._setErrorMessage("newPassword", props);
  }
  //** Записываем полученные данные в форму */
  private _patchFormControl(value: { newPassword: string } | { password: string }) {
    console.log(value);

    this.form.patchValue(value, { emitEvent: false });
    console.log(this.form);
    console.log(this.isSubmittingProps);
  }
  //** Записываем полученную ошибку в соответствующую переменную */
  private _setErrorMessage(control: string, value: string = "") {
    console.log(control);
    console.log(this.form.controls[control]);
    const errorMessage = this.errorMessageService.validationControl(
      this.form.controls[control],
      control,
      value
    );
    console.log(errorMessage);
    if (control === "password") this.errorMessagePass = errorMessage;
    if (control === "newPassword") this.errorMessageNewPass = errorMessage;
    console.log("errorMessagePass: ", this.errorMessagePass);
    console.log("errorMessageNewPass: ", this.errorMessageNewPass);
  }
  //** Отправка формы */
  onSubmitPassword() {
    if (this.form.invalid || this.isSubmitting) {
      return;
    }
    this._passIsSubmitting();
    this._passParamsUser();
  }
  //** Включить/Отключить кнопку во время отправки формы */
  private _passIsSubmitting() {
    this.isSubmitting.emit(true);
  }
  //** Очищаем форму и поля */
  private _passParamsUser() {
    console.log(this._createParamsUser());
    this.paramsUser.emit(this._createParamsUser());
  }
  //** Создаем объект 'FormValue' */
  private _createParamsUser(): ISettingsFormSubmit {
    return {
      name: this.newCurrentUserProps.name,
      login: this.formService.getNumberPhone(this.newCurrentUserProps.phone),
      location: null,
      password: this.form.controls["newPassword"].value,
      prevPassword: this.form.controls["password"].value,
    };
  }
  //** Очистить форму и поля */
  private _resetForm() {
    this.passInput.nativeElement.value = "";
    this.newPassInput.nativeElement.value = "";
    this.form.reset();
  }
}
