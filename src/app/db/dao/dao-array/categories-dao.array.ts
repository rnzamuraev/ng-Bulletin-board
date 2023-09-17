import { Injectable } from "@angular/core";
import { Observable, delay, of } from "rxjs";

import { ICategoryMenu } from "../../types/category.interface";
import { ICategoriesDao } from "../dao-interface/categories-dao.interface";
import { ApiData } from "../../api.data";

@Injectable({ providedIn: "root" })
export class CategoriesDaoArray implements ICategoriesDao {
  get(): Observable<ICategoryMenu[]> {
    // const category: ICategoryMenu[] = ApiData.category;
    return of(ApiData.category).pipe(delay(100));
  }
  post(obj: ICategoryMenu): Observable<ICategoryMenu> {
    throw new Error("Method not implemented.");
  }
  put(obj: ICategoryMenu): Observable<ICategoryMenu> {
    throw new Error("Method not implemented.");
  }
  patch(obj: ICategoryMenu): Observable<ICategoryMenu> {
    throw new Error("Method not implemented.");
  }
  delete(obj: ICategoryMenu): void {
    throw new Error("Method not implemented.");
  }
}
