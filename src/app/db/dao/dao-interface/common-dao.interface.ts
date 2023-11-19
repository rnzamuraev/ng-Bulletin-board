import { Observable } from "rxjs";

export interface ICommonDao<T> {
  get(): Observable<T[]>;
  post(obj: T): Observable<T>;
  put(obj: T): Observable<T>;
  patch(obj: T): Observable<T>;
  delete(obj: T): void;
}
