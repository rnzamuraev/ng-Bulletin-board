import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DADATA_URL_TOKEN } from "src/app/config.API";

@Injectable({
  providedIn: "root",
})
export class DadataInterceptorService implements HttpInterceptor {
  constructor(@Inject(DADATA_URL_TOKEN) private dadataUrl: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    console.log(req.url);
    console.log(req.method);
    console.log(this.dadataUrl);

    if (req.method.toLowerCase().toLocaleLowerCase() !== "post") {
      return next.handle(req.clone({}));
    }
    if (
      req.method.toLowerCase().toLocaleLowerCase() === "post" &&
      req.url.toLowerCase().toLocaleLowerCase() !== "address"
    ) {
      return next.handle(req.clone({}));
    }

    const reqJson = req.clone({
      url: `${this.dadataUrl}/${req.url}`,
      setHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token 3c7cc8f0f42dd84ccdb730c9795ea343aa8ba46a", //3c7cc8f0f42dd84ccdb730c9795ea343aa8ba46a
        // "X-Secret": `04567171dbc9059492ec016b1b751a3682148741`,
        // "X-Secret": `${DADATA_APY_KEY}`,
        // "Access-Control-Allow-Origin": "https://cleaner.dadata.ru/api/v1/clean/address",
        // "Access-Control-Allow-Origin": "http://localhost:4200/lk/settings",
      },
      body: JSON.stringify(req.body),
    });
    console.log(reqJson);
    return next.handle(reqJson);
  }
}
