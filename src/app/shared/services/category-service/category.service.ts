import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { CategoriesDaoArray } from "src/app/db/dao/dao-array/categories-dao.array";
import { ICategoryMenu } from "../../types/category.interface";
import { HttpClient } from "@angular/common/http";
import { IProduct } from "../../types/products.interface";

const API_URL = "https://api.escuelajs.co/api/v1/products";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private converter = [
    ["а", "a"],
    ["б", "b"],
    ["в", "v"],
    ["г", "g"],
    ["д", "d"],
    ["е", "e"],
    ["ё", "e"],
    ["ж", "zh"],
    ["з", "z"],
    ["и", "i"],
    ["й", "y"],
    ["к", "k"],
    ["л", "l"],
    ["м", "m"],
    ["н", "n"],
    ["о", "o"],
    ["п", "p"],
    ["р", "r"],
    ["с", "s"],
    ["т", "t"],
    ["у", "u"],
    ["ф", "f"],
    ["х", "h"],
    ["ц", "ts"],
    ["ч", "ch"],
    ["ш", "sh"],
    ["щ", "sch"],
    ["ь", ""],
    ["ы", "y"],
    ["ъ", ""],
    ["э", "e"],
    ["ю", "yu"],
    ["я", "ya"],
    [" ", "_"],
    [",", ""],
    ["/", "/"],
  ];
  private breadcrumbsLabels$ = new Subject<string[]>();

  constructor(private myHttp: CategoriesDaoArray, private http: HttpClient) {}

  public transliter(str: string) {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      this.converter.forEach(el => {
        if (str.toLowerCase().trim()[i] !== el[0]) return;

        newStr += el[1];
      });
    }
    return newStr;
  }

  //** Breadcrumbs */
  get getBreadcrumbsLabels$(): Observable<string[]> {
    return this.breadcrumbsLabels$.asObservable();
  }
  setBreadcrumbsLabels$(data: string[]) {
    console.log(data);
    this.breadcrumbsLabels$.next(data);
  }
  //** HTTP */
  getCategory(): Observable<ICategoryMenu[]> {
    return this.myHttp.get();
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(API_URL);
  }
  getProductsId(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(API_URL + "/" + id);
  }
}
