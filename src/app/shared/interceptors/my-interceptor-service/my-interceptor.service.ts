import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL_TOKEN, DADATA_URL_TOKEN } from "src/app/config.API";
import { LocalStorageService } from "../../services/local-storage-service/local-storage.service";
import { EStaticVar } from "../../types/staticVar.enum";

interface IHeaderGet {
  "Content-Type": string;
}
interface IHeaderPost {
  Accept: string;
}

@Injectable({
  providedIn: "root",
})
export class MyInterceptorService implements HttpInterceptor {
  private _token: string | null = null;
  private _notFormData = { "Content-Type": "application/json" };
  private _formData = { Accept: "application/json" };
  constructor(
    private localStorage: LocalStorageService,
    @Inject(BASE_URL_TOKEN) private baseUrl: string,
    @Inject(DADATA_URL_TOKEN) private dadataUrl: string
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let header: IHeaderPost | IHeaderGet = this._notFormData;
    const auth = req.url.slice(0, 4).toLowerCase();
    const comment = req.url.slice(0, 7).toLowerCase();

    console.log(auth);
    console.log(comment);
    console.log(req.url);
    console.log(req.method);
    if (
      req.method.toLowerCase().toLocaleLowerCase() === "post" &&
      req.url.toLowerCase().toLocaleLowerCase() === "address"
    ) {
      return next.handle(req.clone({}));
    }

    this._token = this.localStorage.get(EStaticVar.USER_TOKEN_KEY);
    if (this._token) {
      this._token = `Bearer ${this._token}`;
    } else this._token = "";

    if (req.method.toLowerCase() === "put" && comment !== "comment") {
      header = this._formData;
    }
    if (req.method.toLowerCase() === "post") {
      header = this._filterUrl(req.url);
    }
    const reqJson = req.clone({
      url: `${this.baseUrl}/${req.url}`,
      setHeaders: {
        ...header,
        Authorization: `${this._token}`,
      },
    });
    return next.handle(reqJson);
  }

  private _filterUrl(url: string) {
    let header = this._notFormData;
    switch (url.toLowerCase()) {
      case "auth/register":
        return header;
      case "auth/login":
        return header;
      case "advert/search":
        return header;
      default:
        return this._formData;
    }
  }
}
