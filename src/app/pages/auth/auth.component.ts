import { Component, OnDestroy, OnInit } from "@angular/core";

import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { tap } from "rxjs";
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
export class AuthComponent implements OnInit, OnDestroy {
  isLogin = true;
  isUser!: boolean;
  isOpen!: boolean;
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
    console.log("Open Auth Modal");
    // this._fetchCurrentUserByToken();
    this._initializeIsUser();
    this._initializeIsOpen();
  }

  //** Подписываемся на изменения статуса isUser */
  private _initializeIsUser(): void {
    this.userService.getIsUser.subscribe((isData: boolean): void => {
      console.log(isData);
      this.isUser = isData;
      if (isData) {
        this._close();
      }
    });
  }
  //** Подписываемся на изменения статуса открыть/закрыть окно регистрации/авторизации */
  private _initializeIsOpen(): void {
    this.openService.showAuth.subscribe((data: IOpenAuth) => {
      console.log(data);
      this._setIsOpen(data.isOpen);
      this._setLink(data.link);
      this._setErrorsMessage(null);
      this._setIsLogin(true);
    });
  }
  //** Устанавливаем статус открыть/закрыть окно регистрации/авторизации */
  private _setIsOpen(isOpen: boolean): void {
    this.isOpen = isOpen;
  }
  // //** Задаем ссылку для перехода после регистрации/авторизации */
  private _setLink(link: string | null): void {
    this.link = link;
  }
  //** функция переключения авторизации и регистрации */
  onToggleIsLoginProps(props: boolean): void {
    console.log(props);
    this._setErrorsMessage(null);
    this._setIsLogin(props);
  }
  // //** Получаем пользователя после регистрации/авторизации и заносим данные в сервис */
  private _setIsLogin(isValue: boolean): void {
    this.isLogin = isValue;
  }
  // //** Получаем пользователя после регистрации/авторизации и заносим данные в сервис */
  // onGetCurrentUserProps(props: string): void {
  //   // onGetFormValueLoginProps(props: IAuthLogin): void {
  //   console.log(props);
  //   console.log(this.isLogin);
  //   if (props.name) {
  //     //** Authorization */
  //     console.log(props);
  //     this._fetchCurrentUserByToken();
  //     return;
  //   }
  //   //** Register */
  //   console.log(this.isLogin);
  //   console.log(props);
  //   this._fetchCurrentUserById(props);
  // }
  onAddNewUser(user: IAuthRegister) {
    this.authService
      .addUser(user)
      .pipe(
        tap((data: string | HttpErrorResponse) => {
          console.log(data);
          if (typeof data === "string") {
            this.onUserLogIn({ login: user.login, password: user.password });
          }
        })
      )
      .subscribe((data: string | HttpErrorResponse) => {
        // this._setIsSubmitting();
        console.log(data);
        this._setErrorsMessage(data);
      });
  }
  onUserLogIn(formValue: IAuthLogin): void {
    // this.formService.getNumberPhone(this.form.controls["login"].value),
    this.authService
      .userLogin(formValue)
      .pipe(
        tap(data => {
          console.log(data);
          if (typeof data === "string") {
            this._saveToken(data);
            this._savePass(formValue.password);
            this._savePhone();
            this._fetchCurrentUserByToken();
            return;
          }
        })
      )
      .subscribe((data: string | HttpErrorResponse) => {
        console.log(data);
        this._setErrorsMessage(data);
      });
  }
  // //** Получаем пользователя после регистрации по ID и заносим данные в сервис */
  // private _fetchCurrentUserById(id: string): void {
  //   console.log(id);
  //   this.userService
  //     .fetchUserById(id)
  //     .subscribe((user: IUser | null) => {
  //       console.log(id);
  //       console.log(user);
  //       this._setCurrentUser(user);
  //       this._goTo();
  //     });
  // }
  //** Получаем пользователя по 'Token' при загрузке приложения или после авторизации и заносим данные в сервис */
  private _fetchCurrentUserByToken(): void {
    this.userService.fetchCurrentUser().subscribe((user: IUser | null) => {
      console.log(user);
      if (user) {
        this._setCurrentUser(user);
        this._goTo();
      }
      // console.log("loading: ", false);
      // this.queryParamsService.setIsLoadingApp(false);
    });
  }
  //** Заносим данные о пользователе в сервис */
  private _setCurrentUser(user: IUser | null): void {
    this.userService.setCurrentUser(user);
  }
  //** Установить сообщение об ошибке при их наличии */
  private _setErrorsMessage(data: string | HttpErrorResponse | null) {
    console.log(data);
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
  private _close() {
    this.openService.closeAuth(this.link);
  }
  private _goTo(): void {
    console.log(this.link);

    if (this.link) this.router.navigateByUrl(this.link);
  }

  ngOnDestroy(): void {
    console.log("Close Auth Modal");
  }
}
