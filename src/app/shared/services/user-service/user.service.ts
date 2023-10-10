import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, of } from "rxjs";

import { IAddAdverts } from "src/app/pages/lk/types/adverts.interface";
import { LocalStorageService } from "src/app/shared/services/local-storage-service/local-storage.service";
import { IUpdateUser, IUpdateUserResponse, IUser } from "src/app/shared/types/user.interface";
import { IError } from "../../types/error.interface";
import { EStaticVar } from "../../types/staticVar.enum";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private _isUser$ = new BehaviorSubject<boolean>(false);
  private _currentUser$ = new BehaviorSubject<IUser | null>(null);

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  //** HTTP запросы Start*
  get fetchCurrentUser(): Observable<IUser | null> {
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
  addNewAdvert(advert: IAddAdverts): Observable<IAddAdverts | null> {
    return this.http.post<IAddAdverts>("advert", advert).pipe(
      catchError((error: IError) => {
        console.error(error);
        return of(null);
      })
    );
  }
  updateUserSettings(id: string, userUpdate: IUpdateUser): Observable<IUpdateUserResponse | null> {
    return this.http.put<IUpdateUserResponse>(`users/${id}`, userUpdate).pipe(
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
    else this.setIsUser(false);
  }

  //** _IsUser */
  get getIsUser(): Observable<boolean> {
    return this._isUser$.asObservable();
  }
  setIsUser(value: boolean): void {
    this._isUser$.next(value);
  }
}
