import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL_TOKEN, DADATA_URL_TOKEN } from "src/app/config.API";
import { EStaticVar } from "../../types/staticVar.enum";
import { LocalStorageService } from "../local-storage-service/local-storage.service";
// import { LocalStorageService } from "../local-storage-service/local-storage.service";
// import { EStaticVar } from "../../types/staticVar.enum";

interface IHeaderGet {
  "Content-Type": string;
}
interface IHeaderPost {
  "Content-Type": string;
  accept: string;
}

@Injectable({
  providedIn: "root",
})
export class MyInterceptorService implements HttpInterceptor {
  token: string | null = null;
  constructor(
    private localStorage: LocalStorageService,
    @Inject(BASE_URL_TOKEN) private baseUrl: string,
    @Inject(DADATA_URL_TOKEN) private dadataUrl: string
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url);
    console.log(req.method);
    if (
      req.method.toLowerCase().toLocaleLowerCase() === "post" &&
      req.url.toLowerCase().toLocaleLowerCase() === "address"
    ) {
      return next.handle(req.clone({}));
    }

    this.token = this.localStorage.get(EStaticVar.USER_TOKEN_KEY);
    if (!this.token) {
      this.token = "";
    }

    let header!: IHeaderPost | IHeaderGet;
    if (req.method.toLowerCase() === "post") {
      header = { "Content-Type": "multipart/form-data", accept: "application/json" };
    } else header = { "Content-Type": "application/json" };

    const reqJson = req.clone({
      url: `${this.baseUrl}/${req.url}`,
      setHeaders: {
        ...header,
        // "Content-Type": "multipart/form-data",
        // accept: "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${this.token}`,
      },
    });
    return next.handle(reqJson);
  }
  // private _setUrlAndHeaders(req: HttpRequest<any>): HttpRequest<any> {
  //    if (!this.token) {
  //      this.token = "";
  //    }

  //    const reqJson = req.clone({
  //      url: `${this.baseUrl}/${req.url}`,
  //      setHeaders: {
  //        "Content-Type": "application/json",
  //        Authorization: `Bearer ${this.token}`,
  //      },
  //    });
  //   return reqJson;
  // }
  // private _baseUrl(req: HttpRequest<any>): IBase {
  //   const header = {
  //     url: `${this.baseUrl}/${req.url}`,
  //     setHeaders: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${this.token}`,
  //     },
  //   };
  //   return header;
  // }

  // private _dadataUrl(req: HttpRequest<any>): IDadata {
  //   const header = {
  //     url: `${this.dadataUrl}/${req.url}`,
  //     setHeaders: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: "Token 3c7cc8f0f42dd84ccdb730c9795ea343aa8ba46a",
  //       "X-Secret": `${DADATA_URL_TOKEN}`,
  //     },
  //   };
  //   return header;
  // }
}
