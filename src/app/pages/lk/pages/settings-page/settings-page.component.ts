import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, tap } from "rxjs";

import { ErrorMessageService } from "src/app/shared/services/error-message-service/error-message.service";
import { FormService } from "src/app/shared/services/form-service/form.service";
import { UserService } from "src/app/shared/services/user-service/user.service";
import { IUser, IUserResponse } from "src/app/shared/types/user.interface";
import { ISettingsFormSubmit } from "../../types/advert-form.interface";
import { INewUser } from "../../types/user.interface";

@Component({
  selector: "app-settings-page",
  templateUrl: "./settings-page.component.html",
  styleUrls: ["./settings-page.component.scss"],
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  private _unsubscribeGetCurrentUser!: Subscription;
  private _unsubscribeGetIsErrorPassword!: Subscription;
  private _passwordStorage!: string;

  isSubmitting = false;
  isSuccessSubmit = false;
  isErrorPassword!: boolean;
  newCurrentUser!: INewUser;
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private formService: FormService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this._initializeIsErrorPassword();
    this._initializeGetCurrentUser();
  }

  //**? При загрузке страницы */
  //** Подписываемся на изменения статуса ошибки пароля */
  private _initializeIsErrorPassword() {
    this._unsubscribeGetIsErrorPassword = this.errorMessageService.getIsErrorPassword$.subscribe(
      (isData: boolean) => {
        this.isErrorPassword = isData;
      }
    );
  }
  //** Получаем адрес из 'LocalStorage' */
  private _getAddressFromStorage(): string {
    const location = this.formService.getLocation;
    if (location) {
      return location;
    }
    return "";
  }
  //** Получаем телефон из 'LocalStorage' */
  private _getPhoneFromStorage(): string {
    const phone = this.formService.getPhone;
    if (phone) {
      return phone;
    }
    return "";
  }
  //** Устанавливаем статус ошибки пароля */
  private _setIsErrorPass(isValue: boolean) {
    this.errorMessageService.setIsErrorPassword(isValue);
  }
  //** Получаем текущего пользователя если он вошел в аккаунт */
  private _initializeGetCurrentUser() {
    this._unsubscribeGetCurrentUser = this.userService.getCurrentUser$.subscribe(
      (data: IUser | null) => {
        if (data) {
          console.log(data);
          this.newCurrentUser = {
            ...data,
            address: this._getAddressFromStorage(),
            phone: this._getPhoneFromStorage(),
          };
        }
      }
    );
  }
  //** Включить/Отключить кнопку во время отправки формы */
  onIsSubmittingProps(props: boolean) {
    this._setIsSubmitting(props);
  }
  //** Получаем измененные параметры пользователя из формы дочернего компонента */
  onGetParamsUserProps(props: ISettingsFormSubmit) {
    this._setPassword();
    if (props.prevPassword) {
      this._getBackResponse(props, props.prevPassword);
      return;
    }
    this._getBackResponse(props, this._passwordStorage);
  }
  //** Отправка формы */
  private _getBackResponse(formValue: ISettingsFormSubmit, pass: string) {
    this._passwordStatus(pass).then((data: { status: string }) => {
      // this._setIsSubmitting(false);
      console.log(data);
      if (data.status === "Ok") {
        this._updateUserSettings(formValue);
        this._setBackErrorMessage(null);
        return;
      }
      if (data.status === "Error") {
        this._setIsErrorPass(true);
        return;
      }
      this._setBackErrorMessage(data.status);
    });
  }
  private _setIsSubmitting(isValue: boolean) {
    this.isSubmitting = isValue;
    console.log(isValue);
  }
  private _setPassword() {
    const password = this.formService.getPass;
    if (password) {
      this._passwordStorage = password;
    }
  }
  //** Имитация ответа с сервера по состоянию пароля */
  private _passwordStatus(pass: string): Promise<{ status: string }> {
    return new Promise<{ status: string }>(resolve => {
      setTimeout(() => {
        const res = { status: "Текущий пароль не совпадает с введенным" };
        if (this._passwordStorage === pass) res.status = "Ok";
        if (!this._passwordStorage) res.status = "Error";
        resolve(res);
      }, 1000);
    });
  }
  private _setBackErrorMessage(message: string | null) {
    this.errorMessage = message;
  }
  private _updateUserSettings(formValue: ISettingsFormSubmit) {
    this.userService
      .updateUserSettings(this.newCurrentUser.id, this._createFormData(formValue))
      .pipe(
        tap(data => {
          console.log(data);
          if (data) this._fetchCurrentUserById(data.id, formValue);
        })
      )
      .subscribe((data: IUserResponse | null) => {
        console.log(data);
        // this._setIsSuccessSubmit(true);
      });
  }
  // ** Получаем пользователя после изменения данных по ID и заносим данные в сервис */
  private _fetchCurrentUserById(id: string, formValue: ISettingsFormSubmit): void {
    console.log(id);
    this.userService.fetchUserById(id).subscribe((data: IUser | null) => {
      console.log(data);
      this.userService.setCurrentUser(data);
      this._saveParams(formValue);
      this._setIsSuccessSubmit(true);
      this._setIsSubmitting(false);
    });
  }
  //** Создаем объект 'FormData' */
  private _createFormData(formValue: ISettingsFormSubmit): FormData {
    const formData = new FormData();
    formData.append("name", formValue.name);
    formData.append("login", formValue.login);
    if (formValue.password) formData.append("password", formValue.password);
    else formData.append("password", this._passwordStorage);
    return formData;
  }
  //** Сохраняем параметры пользователя */
  private _saveParams(data: ISettingsFormSubmit) {
    if (data.location !== null) {
      this._saveAddress(data.location);
      this._savePhone();
      return;
    }
    if (data.password) this._savePass(data.password);
  }
  //** Сохранить адрес */
  private _saveAddress(value: string) {
    this.formService.saveLocation(value);
  }
  //** Сохранить пароль */
  private _savePass(value: string) {
    this.formService.savePass(value);
  }
  //** Сохранить телефон */
  private _savePhone() {
    this.formService.setIsSavePhone(true);
  }
  //** Получаем измененный статус из дочернего компонента */
  onIsSuccessSubmit(props: boolean) {
    this._setIsSuccessSubmit(props);
  }
  //** Изменение статуса успешной отправки данных на сервер */
  private _setIsSuccessSubmit(isValue: boolean) {
    this.isSuccessSubmit = isValue;
    console.log(isValue);
  }
  //** переход по ссылке на другую страницу */
  onGoTo(value: string) {
    console.log(value);
  }
  //** Отписываемся от кастомных подписок/
  ngOnDestroy(): void {
    this._unsubscribeGetCurrentUser.unsubscribe();
    this._unsubscribeGetIsErrorPassword.unsubscribe();
  }
}
