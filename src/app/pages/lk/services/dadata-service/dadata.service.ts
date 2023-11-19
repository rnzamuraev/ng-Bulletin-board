import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DadataService {
  constructor(private http: HttpClient) {}

  fetchAddress(term: string): Observable<any> {
    console.log(term);
    // return this.http.post<any>("address", { body: `[${term}]` }).pipe(
    // return this.http.post<any>("address", { address: term }).pipe(
    return this.http.post<any>("address", { query: term }).pipe(
      // {query: query}
      map(data => {
        console.log(data);
        return data;
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }
}
