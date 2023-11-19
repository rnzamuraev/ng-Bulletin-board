import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({})).pipe(
      // map(data => {
      //   return data;
      // }),
      catchError((error: any) => {
        console.log(req.url.split("/").slice(-2));
        const url = req.url.split("/").slice(-2);
        const userUrl = url[0] + "/" + url[1];
        console.log(req.clone());
        console.log(error);
        console.error(error);
        console.error(error.status);
        if (error.status === 401) {
          // if (error[])
        }
        return of(error);
        // return next.handle(req.clone());
      })
    );
  }

  private _switchError(data: HttpErrorResponse) {
    switch (data.status) {
      case 401:
        data.message;
        return data;
      default:
        return null;
    }
  }
}
