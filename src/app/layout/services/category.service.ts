import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoriesDaoArray } from "src/app/db/dao/dao-array/categories-dao.array";
import { ICategoryMenu } from "../types/category.interface";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: CategoriesDaoArray) {}

  public getCategory(): Observable<ICategoryMenu[]> {
    return this.http.get();
  }
}
