import { ElementRef, Injectable } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { OpenService } from "../open-service/open.service";
import { EStaticVar } from "../../types/staticVar.enum";
import { LocalStorageService } from "../local-storage-service/local-storage.service";
import { BehaviorSubject, Observable } from "rxjs";
import { QueryParamsService } from '../query-params-service/query-params.service'

@Injectable({
  providedIn: "root",
})
export class FormService {
  private _isSavePhone$ = new BehaviorSubject<boolean>(false);
  constructor(private openService: OpenService, private localStorage: LocalStorageService, private queryParamsService:QueryParamsService) {}

  get getIsSavePhone(): Observable<boolean> {
    return this._isSavePhone$.asObservable();
  }
  setIsSavePhone(isVal: boolean) {
    this._isSavePhone$.next(isVal);
  }

  //**! Работа с 'LocalStorage' */
  //** Получить номер телефона из 'LocalStorage'
  get getPhone(): string | null {
    return this.localStorage.get(EStaticVar.PHONE_KEY);
  }
  //** Сохраняем номер телефона в 'LocalStorage' при его изменении в настройках */
  savePhone(value: string) {
    this.localStorage.set(EStaticVar.PHONE_KEY, value);
  }
  //** Получить 'Location' из 'LocalStorage'
  get getLocation(): string | null {
    return this.localStorage.get(EStaticVar.LOCATION_KEY);
  }
  //** Сохраняем 'Location' в 'LocalStorage' при его изменении в настройках */
  saveLocation(value: string) {
    this.localStorage.set(EStaticVar.LOCATION_KEY, value);
    this._saveCity;
    value;
  }
  private _saveCity(address: string) {
    let city!: string;
    let arrAddressItem!: string[];
    if (address.split(",").length === 0) {
      arrAddressItem = address.split(" ");
      if (arrAddressItem[0].length <= 2 || arrAddressItem[0].toLowerCase() === "город")
        city = arrAddressItem[1];
    } else {
      arrAddressItem = address.split(",")[0].split(" ");
      if (arrAddressItem.length <= 2 || arrAddressItem[0].toLowerCase() === "город")
        city = arrAddressItem[1];
      else city = arrAddressItem[0];
    }
    // if (arrAddressItem.length > 1) city = arrAddressItem[1];
    // else city = arrAddressItem[0];

    console.log(city);
    this.localStorage.set(EStaticVar.CITY_KEY, {
      origin: city.trim(),
      translit: this.queryParamsService.transliter(city.trim()),
    });
  }
  //** Получить токен из 'LocalStorage'
  get getToken(): string | null {
    return this.localStorage.get(EStaticVar.USER_TOKEN_KEY);
  }
  //** Сохраняем токен в 'LocalStorage' при входе пользователя в аккаунт */
  saveToken(value: string) {
    this.localStorage.set(EStaticVar.USER_TOKEN_KEY, value);
  }
  //** Удаляем токен из 'LocalStorage' при выходе пользователя из аккаунта */
  removeToken() {
    this.localStorage.remove(EStaticVar.USER_TOKEN_KEY);
  }
  //** Сохраняем пароль в 'LocalStorage' при входе или регистрации пользователя
  //* для дальнейшей проверки пароля при его изменении эмитируя БД */
  savePass(value: string) {
    this.localStorage.set(EStaticVar.PASS_KEY, value);
  }
  //** Получить пароль из 'LocalStorage'
  get getPass(): string | null {
    return this.localStorage.get(EStaticVar.PASS_KEY);
  }
  //** Удаляем пароль из 'LocalStorage' при выходе пользователя из аккаунта
  removePass() {
    this.localStorage.remove(EStaticVar.PASS_KEY);
  }

  //**! обычные методы */
  //** Обработчик событий клавиатуры */
  keydown(
    e: KeyboardEvent,
    form: FormGroup,
    login: ElementRef<HTMLInputElement>,
    pass: ElementRef<HTMLInputElement>,
    name: ElementRef<HTMLInputElement> | null = null
  ): void {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(e);

      if (form.controls["name"]?.invalid) {
        name?.nativeElement.focus();
        return;
      }
      if (form.controls["login"].invalid) {
        login.nativeElement.focus();
        return;
      }
      if (form.controls["password"].invalid) {
        pass.nativeElement.focus();
        return;
      }
      console.log(e);
      return;
    }
    //** Закрыть форму Регистрации/Авторизации при нажатии на 'Escape' */
    if (e.key === "Escape") this.openService.closeAuth(null);
  }
  //** Получить номер телефона из введенного значения в 'input' */
  getNumberPhone(value: string): string {
    if (value.replace(/\D/g, "").length > 11) return value.replace(/\D/g, "").slice(0, 11);
    else return value.replace(/\D/g, "");
  }
  //** Валидируем поле логин(телефон) */
  setValidatorsLogin(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(control);
      if (typeof control.value === "string" && control.value.replace(/\D/g, "").length === 11) {
        return null;
      }
      return { login: { value: 11, actual: control.value.replace(/\D/g, "").length } };
    };
  }
}
