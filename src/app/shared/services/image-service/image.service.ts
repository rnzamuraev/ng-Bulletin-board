import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, tap } from "rxjs";
import { IError } from "../../types/error.interface";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  constructor(private http: HttpClient) {}

  deleteImageById(id: string): Observable<null> {
    console.log(id);
    return this.http.delete<null>(`Images/${id}`).pipe(
      tap(data => console.log(data)),
      catchError((error: IError) => {
        console.error(error);
        return of(null);
      })
    );
  }
}
