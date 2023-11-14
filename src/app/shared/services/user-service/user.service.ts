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
  private _isUser!: boolean;
  private _isUser$ = new Subject<boolean>();
  // private _isUser$ = new BehaviorSubject<{isUser: boolean, event: string}>(false);
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
  // get fetchCurrentUserAsync(): Promise<Response> | null {
  //   const token = this.localStorage.get(EStaticVar.USER_TOKEN_KEY);
  //   if (!token) {
  //     console.log("token: ", false);
  //     return null;
  //   }
  //   console.log("token: ", true);
  //   return fetch(`http://194.87.237.48:5000/Users/current`, {
  //     headers: {
  //       "Content-type": "application/json;charset=utf-8",
  //       Authentication: `Bearer ${token}`,
  //       // Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   // .pipe(
  //   // catchError((error: IError) => {
  //   //   console.log(error);
  //   //   this.localStorage.remove(EStaticVar.USER_TOKEN_KEY);
  //   //   return of(null);
  //   // })
  //   // );
  // }
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

  //** Current User *
  get getCurrentUser(): Observable<IUser | null> {
    return this._currentUser$.asObservable();
  }
  setCurrentUser(data: IUser | null) {
    console.log(data);
    this._currentUser$.next(data);
    if (data) this.setIsUser(true);
    else {
      this.setIsUser(false);
      this.formService.removeToken();
      this.formService.removePass();
    }
  }

  //** _IsUser */
  get getIsUserStatic(): boolean {
    return this._isUser;
  }
  get getIsUser(): Observable<boolean> {
    return this._isUser$.asObservable();
  }
  setIsUser(value: boolean): void {
    this._isUser$.next(value);
    this._isUser = value;
  }
  // setNewDate() {
  //   const date = new Date();
  //   if (+date > +date + 24 * 3600 * 1000) {
  //     this.localStorage.remove(EStaticVar.USER_TOKEN_KEY);
  //   }
  // }
}
