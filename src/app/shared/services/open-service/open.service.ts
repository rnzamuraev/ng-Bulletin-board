import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IOpenAuth } from "../../types/open-auth.interface";

@Injectable({
  providedIn: "root",
})
export class OpenService {
  private _openAuth$ = new Subject<IOpenAuth>();
  private _openPhone$ = new BehaviorSubject<boolean>(false);

  //** Получить состояние формы Регистрации/Авторизации */
  get showAuth$(): Observable<IOpenAuth> {
    return this._openAuth$.asObservable();
  }
  //** Открыть форму Авторизации */
  openAuth(link: string): void {
    this._openAuth$.next({ isOpen: true, link });
    this.toggleScrolling(true);
  }
  //** Закрыть форму Регистрации/Авторизации */
  closeAuth(link: string | null): void {
    this._openAuth$.next({ isOpen: false, link });
    this.toggleScrolling(false);
  }
  //** Получить состояние формы Регистрации/Авторизации */
  get showPhone$(): Observable<boolean> {
    return this._openPhone$.asObservable();
  }
  //** Показать телефон */
  openPhone(): void {
    this._openPhone$.next(true);
    this.toggleScrolling(true);
  }
  //** Скрыть телефон */
  closePhone(): void {
    this._openPhone$.next(false);
    this.toggleScrolling(false);
  }
  //** Функция вкл/выкл прокрутку страницы */
  toggleScrolling(isData: boolean): void {
    console.log(isData);
    isData ? this._disableScrolling() : this._enableScrolling();
  }
  //** Отключаем прокрутку страницы и убираем сдвиг влево */
  private _disableScrolling(): void {
    const div = document.createElement("div");
    const body = document.body;
    body.appendChild(div);
    const bodyHeight = body.scrollHeight;
    div.style.width = "100px";
    div.style.height = "100vh";
    bodyHeight > div.getBoundingClientRect().height ? (div.style.overflowY = "scroll") : null;
    body.style.paddingRight = 100 - div.clientWidth + "px";
    div.remove();
    body.style.overflow = "hidden";
  }
  //** Включаем прокрутку страницы */
  private _enableScrolling(): void {
    const body = document.body;
    body.style.overflow = "";
    body.style.paddingRight = "0";
  }
}
