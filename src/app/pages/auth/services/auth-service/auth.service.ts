import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ElementRef, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, catchError, of } from "rxjs";

import { OpenService } from "src/app/shared/services/open-service/open.service";
import { IAuthLogin, IAuthRegister } from "src/app/shared/types/auth.interface";
import { IErrorMessage } from "src/app/shared/types/error.interface";

@Injectable()
// { providedIn: "root" }
export class AuthService {
  constructor(private http: HttpClient, private openService: OpenService) {}

  //** HTTP запросы */
  //** Регистрация пользователя */
  // addUser(user: IAuthRegister): Observable<HttpErrorResponse | string> {
  fetchAddUser(body: IAuthRegister): Observable<HttpErrorResponse | string> {
    return this.http.post<string>("auth/register", body).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return of(error);
      })
    );
  }
  //** Авторизация пользователя */
  fetchUserLogin(body: IAuthLogin): Observable<HttpErrorResponse | string> {
    return this.http.post<string>("auth/login", body).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return of(error);
      })
    );
  }
}
