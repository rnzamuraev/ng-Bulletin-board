import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class QueryParamsService {
  private _converter = [
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
  ];
  private queryParamsObj: Params = {
    search: "",
    "price-min": "",
    "price-max": "",
    title: "",
  };
  private _queryParamUrl$ = new BehaviorSubject<string | null>(null);
  private _queryParams: { label: string; value: string }[] = [];
  // private breadcrumbsLabels$ = new Subject<string[]>();

  // constructor(private myHttp: CategoriesDaoArray, private http: HttpClient) {}

  transliter(str: string): string {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      let isStrI = false;
      this._converter.forEach(el => {
        if (str.toLowerCase()[i] !== el[0]) return;
        else isStrI = true;
      });

      if (isStrI) {
        this._converter.forEach(el => {
          if (str.toLowerCase()[i] !== el[0]) return;
          newStr += el[1];
        });
      } else {
        newStr += str[i];
      }
    }
    return newStr;
  }

  setQueryParam(params: Params, value: string): string {
    let item!: string;
    if (typeof params[value] !== "undefined") {
      item = params[value];
    } else item = "";
    return item
  }

  //** Get Query Param Url String */
  get getQueryParamUrl$(): Observable<string | null> {
    return this._queryParamUrl$.asObservable();
  }
  setQueryParamUrl$(params: Params): void {
    this._queryParams = [];
    let link: string | null = "";
    if (Object.keys(params).length) {
      let count = 0;
      let q = "?";
      for (let key in params) {
        const obj = { label: "", value: "" };
        if (count !== 0) {
          q = "&";
        }
        link += `${q}${key}=${params[key]}`;
        count++;

        obj.label = key;
        obj.value = `${q}${key}=${params[key]}`;
        this._queryParams.push(obj);
      }
    } else link = null;

    console.log(this._queryParams);
    console.log(link);
    this._queryParamUrl$.next(link);
  }
  get getQueryParams(): { label: string; value: string }[] {
    return this._queryParams;
  }
}
