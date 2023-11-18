import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, of } from "rxjs";

import { LocalStorageService } from "src/app/shared/services/local-storage-service/local-storage.service";
import { IUpdateUser, IUser, IUserResponse } from "src/app/shared/types/user.interface";
import { IError } from "../../types/error.interface";
import { EStaticVar } from "../../types/staticVar.enum";
import { FormService } from "../form-service/form.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private _isUser$ = new Subject<boolean>();
  private _currentUser$ = new BehaviorSubject<IUser | null>(null);

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private formService: FormService
  ) {}

  //** HTTP запросы Start*
  fetchCurrentUser(): Observable<IUser | null> {
    const token = this.localStorage.get(EStaticVar.USER_TOKEN_KEY);
    if (!token) {
      return of(null);
    }
    return this.http.get<IUser>(`Users/current`).pipe(
      catchError((error: IError) => {
        console.log(error);
        this.localStorage.remove(EStaticVar.USER_TOKEN_KEY);
        return of(null);
      })
    );
  }
  fetchUserById(id: string): Observable<IUser | null> {
    return this.http.get<IUser>(`users/${id}`).pipe(
      catchError((error: IError) => {
        console.error(error);
        return of(null);
      })
    );
  }
  updateUserSettings(id: string, userUpdate: FormData): Observable<IUserResponse | null> {
    return this.http.put<IUserResponse>(`users/${id}`, userUpdate).pipe(
      catchError((error: IError) => {
        console.error(error);
        return of(null);
      })
    );
  }
  //** HTTP запросы End*

  //** Получить данные текущего юзера из сервисе *
  get getCurrentUser$(): Observable<IUser | null> {
    return this._currentUser$.asObservable();
  }
  //** Сохранить данные текущего юзера в сервисе если пользователь разлогинился
  //** удаляются все данные связанные с этим пользователем и токен *
  setCurrentUser(data: IUser | null) {
    this._currentUser$.next(data);
    if (data) this._setIsUser(true);
    else {
      this._setIsUser(false);
      this.formService.removeToken();
      this.formService.removePass();
    }
  }
  //** Подписка на статус залогинин пользователь или нет */
  get getIsUser$(): Observable<boolean> {
    return this._isUser$.asObservable();
  }
  //** Изменяем статус залогинин пользователь или нет */
  private _setIsUser(value: boolean): void {
    this._isUser$.next(value);
  }
}
