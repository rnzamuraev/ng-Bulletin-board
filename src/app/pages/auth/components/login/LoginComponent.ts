import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { ErrorMessageService } from "src/app/shared/services/error-message-service/error-message.service";
import { FormService } from "src/app/shared/services/form-service/form.service";
import { OpenService } from "src/app/shared/services/open-service/open.service";
import { IAuthLogin } from "src/app/shared/types/auth.interface";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  private _phone!: string;

  isInputType = true;
  isSubmitting = false;
  // unacceptableSymbols = "\"№;|^:?*)(_-}{+='><,`.~][/\\";
  // formErrorMessage: string[] = [];
  errorMessageLogin!: string;
  errorMessagePass!: string;
  form!: FormGroup;
  loginInput!: ElementRef<HTMLInputElement>;
  passInput!: ElementRef<HTMLInputElement>;
  errorMessageProps: string[] = [];

  @Output()
  toggleIsLogin = new EventEmitter<boolean>();
  @Output()
  formValue = new EventEmitter<IAuthLogin>();

  @Input("isUserProps")
  set isUser(props: boolean) {
    console.log(props);
    if (props) {
      this._savePass();
      this._resetForm();
      this._setIsSubmitting();
      this.onClose();
    }
  }
  @Input("errorMessageProps")
  set errorMessage(props: string[] | null) {
    console.log(props);
    if (props) {
      this.errorMessageProps = props;
      this._setIsSubmitting();
    }
  }

  constructor(
    private openService: OpenService,
    private formService: FormService,
    private errorMessageService: ErrorMessageService
  ) {}

  @HostListener("window:keydown", ["$event"])
  keyboardEvent(e: KeyboardEvent) {
    console.log(e);
    this.formService.keydown(e, this.form, this.loginInput, this.passInput);
    if (e.key === "Enter" && this.form?.valid && !this.isSubmitting) this.onSubmitLogin();
  }

  ngOnInit(): void {
    this._initializeForm();
  }

  private _initializeForm(): void {
    this.form = new FormGroup({
      login: new FormControl("", [Validators.required, this.formService.setValidatorsLogin()]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24),
      ]),
    });
  }
  //** Получаем 'Login HTMLInputElement' из дочернего компонента */
  onGetLoginInputProps(props: ElementRef<HTMLInputElement>) {
    this.loginInput = props;
  }
  //** Получаем 'Pass HTMLInputElement' из дочернего компонента */
  onGetPasswordInputProps(props: ElementRef<HTMLInputElement>) {
    console.log(props);
    this.passInput = props;
  }
  //** Получаем номер телефона из дочернего компонента */
  onGetPhoneNumberProps(props: string) {
    console.log(props);
    this._patchFormControl({ login: props });
    this._setErrorMessage("login");
  }
  //** Получаем пароль из дочернего компонента */
  onGetPasswordProps(props: string) {
    console.log(props);
    this._patchFormControl({ password: props });
    this._setErrorMessage("password", props);
  }
  //** Записываем полученные данные в форму */
  private _patchFormControl(value: { login: string } | { password: string }) {
    console.log(value);
    this.form.patchValue(value, { emitEvent: false });
    console.log("isSubmitting: ", this.isSubmitting);
    console.log(this.form);
    console.log(this.form.value);
  }
  //** Записываем полученную ошибку в соответствующую переменную */
  private _setErrorMessage(control: string, value: string = "") {
    const errorMessage = this.errorMessageService.validationControl(
      this.form.controls[control],
      control,
      value
    );
    console.log(errorMessage);
    if (control === "login") this.errorMessageLogin = errorMessage;
    if (control === "password") this.errorMessagePass = errorMessage;
  }
  onSetIsLogin(value: boolean): void {
    this.toggleIsLogin.emit(value);
  }
  public onSubmitLogin(): void {
    if (this.form && this.form.invalid) {
      return;
    }

    this._setIsSubmitting();
    this._passFormValue();
  }
  //** Включить/Отключить кнопку во время отправки формы */
  private _setIsSubmitting() {
    this.isSubmitting = !this.isSubmitting;
  }
  //** Сообщить родительскому компоненту что 'Token' получен */
  private _passFormValue() {
    this.formValue.emit(this.form.value);
  }
  //** Сохранить пароль */
  private _savePass() {
    console.log(this.form.controls["password"].value);
    this.formService.savePass(this.form.value.password);
  }
  //** Установить сообщение об ошибке при их наличии */
  // private _setErrorsMessage(value: string[]) {
  //   this.formErrorMessage = value;
  // }
  //** Очищаем форму */
  private _resetForm() {
    this.form.reset();
  }
  onClose() {
    // this.onSetIsLogin(true);
    this.openService.closeAuth(null);
  }
}
