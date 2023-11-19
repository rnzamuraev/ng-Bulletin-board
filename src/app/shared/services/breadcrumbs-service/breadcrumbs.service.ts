import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IBreadcrumbs } from "src/app/shared/types/breadcrumbs.interface";
import { ICategoryChild } from "../../types/category.interface";
import { QueryParamsService } from "../query-params-service/query-params.service";
import { EStaticVar } from "../../types/staticVar.enum";

@Injectable({
  providedIn: "root",
})
export class BreadcrumbsService {
  private _breadcrumbs$ = new BehaviorSubject<IBreadcrumbs[] | null>(null);
  //** Получить хлебные крошки */
  get getBreadcrumbs$(): Observable<IBreadcrumbs[] | null> {
    return this._breadcrumbs$.asObservable();
  }
  //** Добавить хлебные крошки в сервис */
  setBreadcrumbs(data: IBreadcrumbs[]): void {
    this._breadcrumbs$.next(data);
  }
}
