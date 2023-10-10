import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";

import { ICategory, ICategoryChild, INewCategory } from "src/app/shared/types/category.interface";
import { IError } from "src/app/shared/types/error.interface";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  //**? HTTP запросы */
  //** Получить массив всех категорий и под категорий */
  fetchCategories(): Observable<INewCategory[]> {
    return this.http.get<ICategory[]>("categories").pipe(
      map((categories: ICategory[]) => {
        let newCategories: INewCategory[] = [];
        this._copyAndExtendsCategory(categories, newCategories);
        newCategories = newCategories.filter(el => el.name.toLowerCase() !== "default");
        // console.log(newCategories);
        this._setCategories(categories, newCategories);
        return newCategories.filter(el => el.body.length > 0);
      }),
      catchError((err: IError) => {
        console.log(err);
        return of<INewCategory[]>([]);
      })
    );
  }
  private _copyAndExtendsCategory(categories: ICategory[], newCategories: INewCategory[]) {
    categories.forEach(el => {
      // console.log(el);
      const isIter = this._isIter(categories, el);
      if (!isIter) {
        const item: INewCategory = {
          ...el,
          body: [],
        };
        // console.log(item);
        newCategories.push(item);
      }
    });
  }
  private _isIter(categories: ICategory[], item: ICategory): boolean {
    // console.log(item);
    let isIter = false;
    categories.forEach(elem => {
      if (item.parentId === elem.id && elem.name.toLowerCase() !== "default") {
        isIter = true;
        return;
      }
    });
    // console.log(isIter);
    return isIter;
  }
  private _setCategories(categories: ICategory[], newCategories: INewCategory[]) {
    // console.log(newCategories);
    newCategories.forEach(elem => {
      let isIterable = false;
      categories.forEach(el => {
        if (elem.id === el.parentId) {
          isIterable = true;
          const item: INewCategory = {
            ...el,
            body: [],
          };
          elem.body.push(item);
        }
      });
      // console.log(isIterable);
      if (!isIterable) return;
      else this._setCategories(categories, elem.body);
    });
    // console.log(newCategories);
  }
  fetchCategoryById(id: string = ""): Observable<ICategory[]> {
    console.log(id);
    let parentId = "00000000-0000-0000-0000-000000000000";
    console.log(id);
    if (id) {
      if (id !== "") {
        parentId = id;
      }
      console.log(id);
    }
    return this.http.get<ICategoryChild>(`categories/${parentId}`).pipe(
      map((data: ICategoryChild) => {
        console.log(data);
        // const q = data.filter(el => el.name.toLowerCase() !== "default");
        // console.log(q);
        return data.childs;
      }),
      catchError((err: IError) => {
        console.log(err);
        return of<ICategory[]>([]);
      })
    );
  }

  // getCategory(): Observable<ICategoryMenu[]> {
  //   return this.myHttp.get();
  // }

  // getCat(): Observable<any[]> {
  //   return this.http.get<any[]>("http://194.87.237.48:5000/swagger/v1/categories").pipe(
  //     tap(p => {
  //       console.log(p);
  //     })
  //   );
  // }
  // search(term: string): { params: HttpParams } | { params?: undefined } {
  //   term = term.trim();

  //   const options = term ? { params: new HttpParams().set("search", term) } : {};
  //   return options;
  // }
}
