import { Component, OnDestroy, OnInit } from "@angular/core";

import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subscription, mergeMap, of } from "rxjs";

import { ErrorMessageService } from "src/app/shared/services/error-message-service/error-message.service";
import { FormService } from "src/app/shared/services/form-service/form.service";
import { OpenService } from "src/app/shared/services/open-service/open.service";
import { UserService } from "src/app/shared/services/user-service/user.service";
import { IAuthLogin, IAuthRegister } from "src/app/shared/types/auth.interface";
import { IOpenAuth } from "src/app/shared/types/open-auth.interface";
import { IUser } from "src/app/shared/types/user.interface";
import { AuthService } from "./services/auth-service/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  isLogin!: boolean;
  isOpen!: boolean;
  isUser!: boolean;
  link!: string | null;
  header!: string;
  errorMessage!: string[] | null;

  constructor(
    private authService: AuthService,
    private openService: OpenService,
    private userService: UserService,
    private formService: FormService,
    private errorMessageService: ErrorMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initialIsUser();
    this._initialIsOpen();
  }

  //** Подписываемся на изменения статуса isUser */
  private _initialIsUser(): void {
    this.userService.getIsUser$.subscribe((isData: boolean): void => {
      this.isUser = isData;
    });
  }
  //** Подписываемся на изменения статуса открыть/закрыть окно регистрации/авторизации */
  private _initialIsOpen(): void {
    this.openService.showAuth$.subscribe((data: IOpenAuth) => {
      this._setIsLogin(true);
      this._setIsOpen(data.isOpen);
      this._setLink(data.link);
      this._setErrorsMessage(null);
    });
  }
  //** Устанавливаем статус открыть/закрыть окно регистрации/авторизации */
  private _setIsOpen(isOpen: boolean): void {
    this.isOpen = isOpen;
  }
  //** Задаем ссылку для перехода после регистрации/авторизации */
  private _setLink(link: string | null): void {
    this.link = link;
  }
  //** функция переключения авторизации и регистрации */
  onToggleIsLoginProps(props: boolean): void {
    this._setErrorsMessage(null);
    this._setIsLogin(props);
  }
  //** Данный статус отвечает за показ формы регистрации/авторизации  */
  private _setIsLogin(isValue: boolean): void {
    this.isLogin = isValue;
  }
  onAddNewUserProps(user: IAuthRegister): void {
    this.authService.fetchAddUser(user).subscribe((data: string | HttpErrorResponse) => {
      if (typeof data === "string") {
        this.onUserLogInProps({ login: user.login, password: user.password });
      }
      this._setErrorsMessage(data);
    });
  }
  onUserLogInProps(formValue: IAuthLogin): void {
    this.authService
      .fetchUserLogin(formValue)
      .subscribe((data: string | HttpErrorResponse): void => {
        if (typeof data === "string") {
          this._saveToken(data);
          this._savePass(formValue.password);
          this._savePhone();
          this._goTo();
        } else this._setErrorsMessage(data);
      });
  }
  //** Установить сообщение об ошибке при их наличии */
  private _setErrorsMessage(data: string | HttpErrorResponse | null) {
    if (data === null) {
      this.errorMessage = null;
      return;
    }
    if (typeof data !== "string") {
      this.errorMessage = this.errorMessageService.setBackErrorMessage(data.error);
      return;
    }
    this.errorMessage = [];
  }
  //** Сохранить 'Token' */
  private _saveToken(value: string) {
    this.formService.saveToken(value);
  }
  //** Сохранить пароль */
  private _savePass(pass: string) {
    this.formService.savePass(pass);
  }
  //** Сохранить телефон */
  private _savePhone() {
    this.formService.setIsSavePhone(true);
  }
  //** Переходим по ссылке на другую страницу */
  private _goTo(): void {
    console.log(this.link);
    if (this.link) this.router.navigateByUrl(this.link);
  }
}
