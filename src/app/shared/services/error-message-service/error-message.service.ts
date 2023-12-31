import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { IErrorMessage } from "../../types/error.interface";
import { BehaviorSubject, Observable } from "rxjs";

export interface IErrorsMessage {
  minLength: string;
  number: string;
  phone: string;
  noNumber: string;
  required: string;
  password: string;
  space: string;
  maxLength: string;
  max: string;
}

@Injectable({
  providedIn: "root",
})
export class ErrorMessageService {
  private _isNotFoundPage$ = new BehaviorSubject<boolean>(false);
  private _isErrorPassword$ = new BehaviorSubject<boolean>(false);
  constructor() {}

  //** Получить статус состояния (True,False) динамической страницы при загрузке где параметры приходят с сервера, например: 'ID' товара */
  get getIsNotFoundPage$(): Observable<boolean> {
    return this._isNotFoundPage$.asObservable();
  }
  //** Установить статус состояния (True,False) динамической страницы где параметры приходят с сервера, например: 'ID' товара */
  setIsNotFoundPage(isValue: boolean) {
    this._isNotFoundPage$.next(isValue);
  }
  //**! Получить статус состояния ошибки пароля
  get getIsErrorPassword$(): Observable<boolean> {
    return this._isErrorPassword$.asObservable();
  }
  setIsErrorPassword(isError: boolean) {
    this._isErrorPassword$.next(isError);
  }
  //** Передаем текущий контрол( контроллер поля формы ) для валидации и вывода сообщения при не валидности */
  validationControl(control: AbstractControl, controlName: string, value: string = ""): string {
    let errorMessage!: string;
    console.log(control);
    if (control.errors) {
      console.log(control.errors);
      errorMessage = this._setErrorMessage(control.errors, controlName, value);
    }
    console.log(errorMessage);
    return errorMessage;
  }
  //** Задаем общие условия первого уровня для получения того или иного сообщения о не валидности поля формы */
  private _setErrorMessage(err: ValidationErrors, controlName: string, value: string): string {
    console.log(err);
    if (err["pattern"]) {
      console.log("pattern");
      return this._setPattern(controlName, value);
    }
    if (err["required"]) {
      console.log("required");
      return this._errorMessages(this._param(err["required"].required, null)).required;
    }
    if (err["minlength"]) {
      console.log("minlength");
      return this._errorMessages(this._param(err["minlength"].requiredLength, null)).minLength;
    }
    if (err["maxlength"]) {
      console.log("maxlength");
      return this._errorMessages(
        this._param(err["maxlength"].requiredLength, err["maxlength"].actualLength)
      ).maxLength;
    }
    if (err["max"]) {
      console.log("max");
      return this._errorMessages(this._param(err["max"].max, err["max"].actual)).max;
    }
    if (err["login"]) {
      console.log("login");
      return this._errorMessages(this._param(err["login"].value, err["login"].actual)).phone;
    }
    return "Не известная ошибка";
  }
  //** Устанавливаем сообщения об ошибке для паттернов формы */
  private _setPattern(controlName: string = "", value: string): string {
    let message = "";
    switch (controlName) {
      case "name":
        message = this._errorMessages().noNumber;
        break;
      case "login":
        message = this._errorMessages().phone;
        break;
      case "password":
        message = this._setPatternPass(value);
        break;
      case "newPassword":
        message = this._setPatternPass(value);
        break;
    }
    console.log(message);
    return message;
  }
  //** Устанавливаем фильтр проверки строки на пробел между символами актуально для паролей */
  private _setPatternPass(value: string): string {
    const isSpace = this._validSpaceFilter(value);
    if (isSpace) return this._errorMessages().space;
    else return this._errorMessages().password;
  }
  //** проверяем строку на наличие в ней пробелов между символами */
  private _validSpaceFilter(password: string) {
    const space = " ";
    let isSpace = false;
    for (let j = 0; j < space.length; j++) {
      for (let i = 0; i < password.length; i++) {
        if (password[i] === space) isSpace = true;
      }
    }
    return isSpace;
  }
  //** Создаем общий список всех сообщений об ошибке */
  private _errorMessages(
    props: { num: number | null; length: number | null } | null = null
  ): IErrorsMessage {
    console.log(props);
    return {
      minLength: `Минимальное количество символов ${props?.num}`,
      number: "Должны быть только цифры",
      phone: `Телефон должен содержать 11 цифр`,
      noNumber: "Должны быть только буквы",
      required: `Обязательное поле со "*" не должно быть пустым`,
      password: "Пароль должен содержать как минимум одну заглавную букву и одну цифру.",
      space: "Пароль не должен содержать пробелов.",
      maxLength: `Максимальное количество символов ${props?.num}, текущее: ${props?.length}`,
      // max: `Введенное значение не должно превышать ${props?.num}, текущее: ${props?.length}`,
      max: `Введенное значение не должно превышать ${props?.num}`,
    };
  }
  //** Задаем общие параметры для упрощения написания кода */
  private _param(arg1: number | null, arg2: number | null) {
    return {
      num: arg1,
      length: arg2,
    };
  }
  //** Задаем условия для получения того или иного сообщения */
  setBackErrorMessage(err: IErrorMessage): string[] {
    if (err.login) {
      console.log(err.login);
      return this._getNewErrors(err.login);
    }
    if (err.errors) {
      console.log(err.errors);
      return this._getNewErrors(err.errors);
    }
    return ["Не известная ошибка"];
  }
  // ** Получаем и преобразовываем сообщение ошибки с сервера */
  private _getNewErrors(errors: string[]): string[] {
    return errors.map((el: string) => {
      if (el === "Invalid login or password") return "Не верный логин или пароль";
      if (el === "Пользователь с таким логином уже существует.")
        return "Пользователь с таким телефоном уже существует.";
      return el;
    });
  }
}
