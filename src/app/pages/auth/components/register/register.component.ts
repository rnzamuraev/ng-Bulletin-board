import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { ErrorMessageService } from "src/app/shared/services/error-message-service/error-message.service";
import { FormService } from "src/app/shared/services/form-service/form.service";
import { OpenService } from "src/app/shared/services/open-service/open.service";
import { IAuthRegister } from "src/app/shared/types/auth.interface";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  isSubmitting = false;
  errorMessageName!: string;
  errorMessageLogin!: string;
  errorMessagePass!: string;
  form!: FormGroup;
  loginInput!: ElementRef<HTMLInputElement>;
  passInput!: ElementRef<HTMLInputElement>;
  errorMessageProps: string[] = [];

  @Output()
  toggleIsLogin = new EventEmitter<boolean>();
  @Output()
  formValue = new EventEmitter<IAuthRegister>();

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

  @ViewChild("name")
  name!: ElementRef<HTMLInputElement>;

  constructor(
    private openService: OpenService,
    private formService: FormService,
    private errorMessageService: ErrorMessageService
  ) {}

  //** Отслеживаем 'Event' кнопок клавиатура 'Enter' и 'Escape' */
  @HostListener("window:keydown", ["$event"])
  keyboardEvent(e: KeyboardEvent) {
    this.formService.keydown(e, this.form, this.loginInput, this.passInput, this.name);
    if (e.key === "Enter" && this.form?.valid && !this.isSubmitting) this.onSubmitRegister();
  }

  ngOnInit(): void {
    this._initializeForm();
    this._initializeValidationForm();
  }

  //** Создаем форму, задаем параметры */
  private _initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
        Validators.pattern(/^[a-zа-яёA-ZА-ЯЁ]*$/i),
      ]),
      login: new FormControl("", [Validators.required, this.formService.setValidatorsLogin()]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24),
        Validators.pattern(/^(?=.*[\d])(?=.*[A-ZА-ЯЁ])[^ ]{2,}$/),
      ]),
    });
  }
  //** Подписываемся на изменения значений в форме */
  private _initializeValidationForm() {
    this.form.valueChanges.subscribe((data: IAuthRegister) => {
      if (data.name) {
        this.errorMessageName = this.errorMessageService.validationControl(
          this.form.controls["name"],
          "name"
        );
      }
    });
  }
  //** Получаем 'Login HTMLInputElement' из дочернего компонента */
  onGetLoginInputProps(props: ElementRef<HTMLInputElement>) {
    this.loginInput = props;
  }
  //** Получаем 'Password HTMLInputElement' из дочернего компонента */
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
  //** Записываем полученные данные из дочерних в форму */
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
    if (control === "login") this.errorMessageLogin = errorMessage;
    if (control === "password") this.errorMessagePass = errorMessage;
  }
  //** Передаем значение 'isLogin' переключателю формы Авторизация/Регистрация */
  onSetIsLogin(value: boolean): void {
    this.toggleIsLogin.emit(value);
  }
  //** Отправить форму регистрации */
  onSubmitRegister() {
    if (this.form.invalid) {
      return;
    }
    this._setIsSubmitting();
    this._passNewUser(this.form.value);
  }
  //** Передать параметры нового пользователя в родительский компонент */
  private _passNewUser(user: IAuthRegister) {
    this.formValue.emit(user);
  }
  //** Включить/Отключить кнопку во время отправки формы */
  private _setIsSubmitting() {
    this.isSubmitting = !this.isSubmitting;
  }
  //** Очистить форму */
  private _resetForm() {
    this.form.reset();
  }
  //** Закрыть форму */
  onClose() {
    this.openService.closeAuth(null);
  }
}
