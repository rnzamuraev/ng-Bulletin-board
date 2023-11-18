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
  isInputType = true;
  isSubmitting = false;
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
    if (props) {
      this._resetForm();
    }
  }
  @Input("errorMessageProps")
  set errorMessage(props: string[] | null) {
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
    this._initialForm();
  }

  private _initialForm(): void {
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
    this.passInput = props;
  }
  //** Получаем номер телефона из дочернего компонента */
  onGetPhoneNumberProps(props: string) {
    this._patchFormControl({ login: props });
    this._setErrorMessage("login");
  }
  //** Получаем пароль из дочернего компонента */
  onGetPasswordProps(props: string) {
    this._patchFormControl({ password: props });
    this._setErrorMessage("password", props);
  }
  //** Записываем полученные данные в форму */
  private _patchFormControl(value: { login: string } | { password: string }) {
    this.form.patchValue(value, { emitEvent: false });
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
  //** Переключение на форму Регистрации */
  onSetIsLogin(): void {
    this.toggleIsLogin.emit(false);
  }
  //** Отправка формы Авторизации */
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
  //** Передать объект с параметрами для авторизации */
  private _passFormValue() {
    this.formValue.emit(this.form.value);
  }
  //** Очищаем форму */
  private _resetForm() {
    this.form.reset();
  }
  onClose() {
    this.openService.closeAuth(null);
  }
}
