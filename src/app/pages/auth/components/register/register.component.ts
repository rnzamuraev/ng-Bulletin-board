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

  // @Input("isUserProps")
  // set isUser(props: boolean) {
  //   if (props) {
  //     this._savePass();
  //     this._resetForm();
  //     this._setIsSubmitting();
  //     this.onClose();
  //   }
  // }
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
    // private authService: AuthService,
    private openService: OpenService,
    private formService: FormService,
    private errorMessageService: ErrorMessageService
  ) {}

  //** Отслеживаем 'Event' кнопок клавиатура 'Enter' и 'Escape' */
  @HostListener("window:keydown", ["$event"])
  keyboardEvent(e: KeyboardEvent) {
    console.log(e);
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
        // Validators.pattern(/^[a-zа-яё][a-zа-яё]+[ _]?[A-ZА-ЯЁ]*$/i),
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
      console.log(data);
      console.log(this.form.controls["login"].errors);
      if (data.name) {
        this.errorMessageName = this.errorMessageService.validationControl(
          this.form.controls["name"],
          "name"
        );
        console.log(data.name);
      }
    });
  }
  //** Получаем 'Login HTMLInputElement' из дочернего компонента */
  onGetLoginInputProps(props: ElementRef<HTMLInputElement>) {
    console.log(props);
    this.loginInput = props;
  }
  //** Получаем 'Password HTMLInputElement' из дочернего компонента */
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
    console.log(this.form);
    console.log(this.form.value);
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
    console.log(this.form.value);
    this._setIsSubmitting();
    this._passNewUser(this.form.value);
  }
  //** Передать параметры нового пользователя в родительский компонент */
  private _passNewUser(user: IAuthRegister) {
    this.formValue.emit(user);
  }
  // //** Добавляем нового пользователя, получаем 'ID' нового пользователя */
  // private _addNewUser(user: IAuthRegister) {
  //   this.authService.addUser(user).subscribe((data: string | HttpErrorResponse) => {
  //     this._setIsSubmitting();
  //     console.log(data);
  //     if (typeof data === "string") {
  //       console.log(data);
  //       this._savePass();
  //       this._passNewUserId(data);

  //       this._setErrorsMessage([]);
  //       return;
  //     }
  //     this._setErrorsMessage(this.errorMessageService.setBackErrorMessage(data.error));
  //   });
  // }
  //** Сохранить пароль */
  private _savePass() {
    this.formService.savePass(this.form.value.password);
  }
  // //** Установить сообщение об ошибке при их наличии */
  // private _setErrorsMessage(value: string[]) {
  //   this.formErrorMessage = value;
  // }
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
    // this.toggleIsLogin.emit(true);
    this.openService.closeAuth(null);
  }
}
