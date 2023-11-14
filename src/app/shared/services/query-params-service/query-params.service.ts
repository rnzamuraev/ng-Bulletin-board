import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { EStaticVar } from "../../types/staticVar.enum";
import { LocalStorageService } from "../local-storage-service/local-storage.service";
import { ICityStorage } from "../../types/query-params.interface";

@Injectable({
  providedIn: "root",
})
export class QueryParamsService {
  private _isLoadingInfoPage$ = new BehaviorSubject<boolean>(false);
  private _isLoadingApp$ = new BehaviorSubject<boolean>(false);
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
    [".", ""],
  ];

  constructor(private localStorage: LocalStorageService) {}
  //** Получить состояние страницы загружается или нет для 'Guard'а Авторизации/Регистрации */
  get getIsLoadingApp$(): Observable<boolean> {
    return this._isLoadingApp$.asObservable();
  }
  //** Задать состояние страницы загружается или нет */
  setIsLoadingApp(isData: boolean) {
    console.log(isData);
    this._isLoadingApp$.next(isData);
  }
  //** Получить состояние страницы информации о товаре */
  get getIsLoadingInfoPage$(): Observable<boolean> {
    return this._isLoadingInfoPage$.asObservable();
  }
  //** Задать состояние страницы информации о товаре */
  setIsLoadingInfoPage(isData: boolean) {
    this._isLoadingInfoPage$.next(isData);
  }

  //** Переводит русские слова в транслит для 'Url' строки */
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
  //** Установить 'Query Params' */
  createQueryParams(params: { term: string; min: string; max: string; sort: string }) {
    let { term, min, max, sort } = params;
    let newTerm!: { search: string };
    let newMin!: { min: string };
    let newMax!: { max: string };
    let newSort!: { sort: string };
    if (term && term.trim().length > 0) newTerm = { search: term };
    if (min && min.trim().length > 0) newMin = { min };
    if (max && max.trim().length > 0) newMax = { max };
    if (sort && sort.trim().length > 0) newSort = { sort };
    console.log({ queryParams: { ...newTerm, ...newMin, ...newMax, ...newSort } });
    return { queryParams: { ...newTerm, ...newMin, ...newMax, ...newSort } };
  }
  // //** Создать ссылку */
  // createLink(url: string) {}
  //** Получить Город из 'LocalStorage'
  get getCity(): string {
    let city: ICityStorage | null = this.localStorage.get(EStaticVar.CITY_KEY);
    console.log(city);
    if (city) {
      return city.translit.toLowerCase().trim();
    }
    return "all";
  }
  //** Сохраняем 'City' в 'LocalStorage' при его изменении в настройках */
  saveCity(value: string) {
    this.localStorage.set(EStaticVar.CITY_KEY, value);
  }
}
