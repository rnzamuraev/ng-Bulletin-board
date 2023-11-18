import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, map, of, tap } from "rxjs";

import { ICategory, ICategoryChild } from "src/app/shared/types/category.interface";
import { IError } from "src/app/shared/types/error.interface";
import { LocalStorageService } from "../local-storage-service/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private _defaultId = "00000000-0000-0000-0000-000000000000";

  private _categoryChildList$ = new BehaviorSubject<ICategoryChild[] | null>(null);
  private _categoriesForLink$ = new Subject<ICategory[]>();

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  //**? HTTP запросы */
  //** Получить массив всех категорий и под категорий пока есть вложенность (массив не пустой) */
  fetchCategories(): Observable<ICategoryChild[]> {
    return this.http.get<ICategory[]>("categories").pipe(
      map((categories: ICategory[]) => {
        let newCategories: ICategoryChild[] = [];
        this._copyAndExtendsCategory(categories, newCategories);
        newCategories = newCategories.filter(el => el.name.toLowerCase() !== "default");
        this._setCategories(categories, newCategories);
        return newCategories.filter(el => el.childs.length > 0);
      }),
      catchError((err: IError) => {
        console.log(err);
        return of<ICategoryChild[]>([]);
      })
    );
  }
  //** Копируем и расширяем категорию добавляя новое поле ко всем категориям */
  private _copyAndExtendsCategory(categories: ICategory[], newCategories: ICategoryChild[]) {
    categories.forEach(el => {
      // console.log(el);
      const isIter = this._isIter(categories, el);
      if (!isIter) {
        const item: ICategoryChild = {
          ...el,
          childs: [],
        };
        newCategories.push(item);
      }
    });
  }
  //** Создаем условие для окончания итерации */
  private _isIter(categories: ICategory[], item: ICategory): boolean {
    let isIter = false;
    categories.forEach(elem => {
      if (item.parentId === elem.id && elem.name.toLowerCase() !== "default") {
        isIter = true;
        return;
      }
    });
    return isIter;
  }

  private _setCategories(categories: ICategory[], newCategories: ICategoryChild[]) {
    // console.log(newCategories);
    newCategories.forEach((elem: ICategoryChild) => {
      let isIterable = false;
      categories.forEach(el => {
        if (elem.id === el.parentId) {
          isIterable = true;
          const item: ICategoryChild = {
            ...el,
            childs: [],
          };
          elem.childs.push(item);
        }
      });
      // console.log(isIterable);
      if (!isIterable) return;
      else this._setCategories(categories, elem.childs);
    });
  }
  fetchCategoryById(id: string): Observable<ICategory | null> {
    console.log(id);
    return this.http.get<ICategory>(`categories/${id}`).pipe(
      tap(data => console.log(data)),
      catchError((err: IError) => {
        console.log(err);
        return of(null);
      })
    );
  }
  // ** поиск категорий по 'ID' получаем категорию с массивом категорий которые она содержит *
  fetchCategoryChildByParentId(id: string = ""): Observable<ICategory[]> {
    let parentId = this._defaultId;
    // if (id) {
    if (id !== "") {
      parentId = id;
    }
    // }
    return this.http.get<ICategoryChild>(`categories/${parentId}`).pipe(
      map((data: ICategoryChild) => {
        console.log(data);
        return data.childs;
      }),
      catchError((err: IError) => {
        console.log(err);
        return of<ICategory[]>([]);
      })
    );
  }
  //** Получить сохраненный список категорий  */
  get getCategoryChildList$(): Observable<ICategoryChild[] | null> {
    return this._categoryChildList$.asObservable();
  }
  //** Сохранить список категорий в сервисе */
  setCategoryChildList(data: ICategoryChild[]): void {
    this._categoryChildList$.next(data);
  }
  // //**! Получить сохраненный список категорий 'Breadcrumbs' */
  // get getCategoriesForLink$(): Observable<ICategory[]> {
  //   return this._categoriesForLink$.asObservable();
  // }
  // //** Сохранить список категорий 'Breadcrumbs' в сервисе */
  // setCategoriesForLink(data: ICategory[]): void {
  //   this._categoriesForLink$.next(data);
  // }
  //** Получить список 'ID' категории по которым кликал пользователь */
  get getCategoriesId(): string[] {
    const categories: string[] = this.localStorage.get("__analytics__");
    if (categories) return categories;
    else return [];
  }
  //** Сохранить 'ID' категории по которым кликал пользователь предварительно отфильтровав от повторений*/
  saveCategoryId(id: string) {
    const categories: string[] = this.getCategoriesId;
    if (categories.filter((elem: string) => elem === id).length === 1) return;
    categories.push(id);
    const newCategories: string[] = [];
    if (categories.length > 10) {
      newCategories.push(...categories.slice(1));
    } else newCategories.push(...categories);
    this.localStorage.set("__analytics__", newCategories);
  }
  //** Получить 'ID' самой первой ('Default') родительской категории */
  get getDefaultId(): string {
    return this._defaultId;
  }
}
