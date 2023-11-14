import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ElementRef, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, catchError, of } from "rxjs";

import { OpenService } from "src/app/shared/services/open-service/open.service";
import { IAuthLogin, IAuthRegister } from "src/app/shared/types/auth.interface";
import { IErrorMessage } from "src/app/shared/types/error.interface";

@Injectable(
  // { providedIn: "root" }
)
export class AuthService {
  constructor(private http: HttpClient, private openService: OpenService) {}

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
}
