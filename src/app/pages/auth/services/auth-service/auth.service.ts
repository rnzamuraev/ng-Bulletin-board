import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, map, of } from "rxjs";

import { LocalStorageService } from "src/app/shared/services/local-storage-service/local-storage.service";
import { UserService } from "src/app/shared/services/user-service/user.service";
import { IAuthLogin, IAuthRegister } from "src/app/shared/types/auth.interface";
import { IError } from "src/app/shared/types/error.interface";
import { EStaticVar } from "src/app/shared/types/staticVar.enum";
import { IUser } from "src/app/shared/types/user.interface";

@Injectable()
// {providedIn: "root",}
export class AuthService {
  private _isOpen = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  //** HTTP запросы */
  //** Регистрация пользователя */
  // addUser(user: IAuthRegister): Observable<HttpErrorResponse | string> {
  addUser(user: IAuthRegister): Observable<any> {
    return this.http.post("auth/register", user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return of(error);
      })
    );
  }
  //** Авторизация пользователя */
  userLogin(user: IAuthLogin): Observable<any> {
    return this.http.post("auth/login", user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return of(error);
      })
    );
  }

  //** обычные методы */
  //** Открыть-Закрыть форму Регистрации/Авторизации */
  get show(): Observable<boolean> {
    return this._isOpen.asObservable();
  }
  open(): void {
    this._isOpen.next(true);
  }
  close(): void {
    this._isOpen.next(false);
  }
}
