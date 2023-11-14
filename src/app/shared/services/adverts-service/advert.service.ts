import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, of } from "rxjs";

import {
  IAdvertById,
  IAdvertSearchReq,
  IAdvertSearchRes,
  // IAdvertSearchRes,
  IAdvertUser,
} from "src/app/shared/types/adverts.interface";
import { ICategoryChild } from "../../types/category.interface";
import { IError } from "../../types/error.interface";

@Injectable({
  providedIn: "root",
})
export class AdvertService {
  private _searchArrayAdverts!: IAdvertUser[];
  private _count!: number;
  private _isEdit$ = new BehaviorSubject<boolean>(false);
  private _isAdvert!: boolean;
  private _alphabet = ["а", "е", "и", "о", "у", "э", "ю", "я"];
  private _searchArrayAdverts$ = new Subject<IAdvertUser[]>();
  private _advert$ = new BehaviorSubject<IAdvertById | null>(null);

  constructor(private http: HttpClient) {}

  //**? HTTP запросы*/
  private _fetchAdverts(body: IAdvertSearchReq): Observable<IAdvertUser[]> {
    return this.http.post<IAdvertUser[]>("advert/search", body).pipe(
      catchError(e => {
        console.log(e);
        return of([]);
      })
    );
  }
  addNewAdvert(advert: FormData): Observable<IAdvertUser | null> {
    return this.http.post<IAdvertUser>(`advert`, advert).pipe(
      catchError((error: IError) => {
        console.error(error);
        return of(null);
      })
    );
  }
  updateAdvert(id: string, advert: FormData): Observable<IAdvertUser | null> {
    return this.http.put<IAdvertUser>(`advert/${id}`, advert).pipe(
      catchError((error: IError) => {
        console.error(error);
        return of(null);
      })
    );
  }
  fetchAdvertById(id: string): Observable<IAdvertById | null> {
    return this.http.get<IAdvertById>(`advert/${id}`).pipe(
      catchError((error: IError) => {
        console.error(error);
        return of(null);
      })
    );
  }
  deleteAdvert(id: string): Observable<IError | null> {
    return this.http.delete<IError | null>(`advert/${id}`).pipe(
      catchError((error: IError) => {
        console.error(error);
        return of(error);
      })
    );
  }
  //** Отобразить полученное объявление по 'ID' для отображения на странице 'Info' */
  get getAdvert$(): Observable<IAdvertById | null> {
    return this._advert$.asObservable();
  }
  //** Передаем полученное объявление по 'ID' для отображения на странице 'Info' */
  setAdvert(data: IAdvertById) {
    this._advert$.next(data);
  }
  // *********************************************
  //** Передаем параметры поиска для получения списка объявлений во всех категориях */
  searchAllAdverts(category: ICategoryChild[], term: string = ""): void {
    this._isAdvert = false;
    let terms = this.getAlphabet;
    if (term) terms = [term];
    this._initialParamsForSearch();
    // if (typeof term === "string") this._searchByCategories(term.toLowerCase().trim(), categories);
    // else
    terms.forEach((elem: string) => {
      this._searchByCategories(elem, category);
    });
  }

  private _searchByCategories(term: string, category: ICategoryChild[]): void {
    // if (category.childs.length > 0)
    category.forEach((category: ICategoryChild) => {
      if (category.childs.length > 0) {
        this._searchByCategories(term, category.childs);
        return;
      }
      this._count++;
      this._fetchAdvertsByCategory(term, category);
    });
  }
  // //** Передать параметры для получения списка объявления по категории(в 1 категории) работает с категориями поль */
  // searchAdvertByCategory(category: ICategoryChild) {
  //   console.log(category);
  //   this._initialParamsForSearch();
  //   this._alphabet.forEach((el: string) => {
  //     this._count++;
  //     this._fetchAdvertsByCategory(el, category);
  //   });
  // }
  private _initialParamsForSearch() {
    this._searchArrayAdverts = [];
    this._count = 0;
  }
  //** Получаем объявление по категории */
  private _fetchAdvertsByCategory(term: string, category: ICategoryChild): void {
    let count = 0;
    this._fetchAdverts(this._createBody(term, category.id)).subscribe((adverts: IAdvertUser[]) => {
      count++;
      console.log(adverts);
      // let cat: ICategoryChild | null = category;
      // if (data.length === 0) cat = null;
      console.log(this._count);
      console.log(count);
      if (adverts.length === 0) {
        // if (this._count === count && this._searchArrayAdverts.length === 0)
        if (this._isAdvert) return;
        this._setAdvertsAfterSearching([]);
        this._isAdvert = true;
        // return;
      }
      // this._setSearch({ adverts: adverts, category: cat, count: this._count });
      this._addNewParamAdvertising({ adverts, category, count });
    });
  }
  //** Создаем объект для поиска по категории */
  private _createBody(term: string, id: string): IAdvertSearchReq {
    return {
      search: term,
      showNonActive: true,
      category: id,
    };
  }
  // ** Фильтруем найденные объявления по 'ID' от дублирования */
  private _addNewParamAdvertising(data: IAdvertSearchRes) {
    const newAdverts: IAdvertUser[] = [];
    data.adverts.forEach((elem: IAdvertUser) => {
      if (this._searchArrayAdverts.filter((el: IAdvertUser) => el.id === elem.id).length === 1)
        return;
      // elem.categoryId = data.category?.id;
      this._searchArrayAdverts.push(elem);
      newAdverts.push(elem);
    });
    this._setAdvertsAfterSearching(newAdverts);
  }
  //** Получить список объявлений и их категорий при поиске */
  get getAdvertsAfterSearching$(): Observable<IAdvertUser[]> {
    return this._searchArrayAdverts$.asObservable();
  }
  //** передать полученный список объявлений в подписку */
  private _setAdvertsAfterSearching(data: IAdvertUser[]) {
    this._searchArrayAdverts$.next(data);
  }
  //** Получить список объявлений и их категорий при поиске */
  get getIsEdit$(): Observable<boolean> {
    return this._isEdit$.asObservable();
  }
  //** передать полученный список объявлений в подписку */
  setIsEdit(data: boolean) {
    this._isEdit$.next(data);
  }
  //** Получить алфавит */
  get getAlphabet(): string[] {
    return this._alphabet;
  }
}
