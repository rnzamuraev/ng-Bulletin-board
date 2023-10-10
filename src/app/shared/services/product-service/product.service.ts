import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { IProduct, IProductsFilter } from "../../types/products.interface";

const API_URL = "https://api.escuelajs.co/api/v1/products";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}
  //** HTTP */
  search(term: string): { params: HttpParams } | { params?: undefined } {
    term = term.trim();

    const options = term ? { params: new HttpParams().set("search", term) } : {};
    return options;
  }
  // getFilterByProducts(body: IProductsFilter): Observable<IProduct[]> {
  //   // body.title ? body.title = body.title.trim() : null;

  //   // const options = body.title ? { params: new HttpParams().set("search", body.title) } : {};

  //   return this.http.get<IProduct[]>(
  //     // API_URL + "/?title=Generic&price_min=100&price_max=1000&categoryId=1&offset=10&limit=10"
  //     // API_URL + "/?title=Generic&price_min=100&price_max=1000&offset=10&limit=10&categoryId=1"
  //     // API_URL +
  //     `?title=${body.title}&price_min=${body.min}&price_max=${body.max}&offset=${body.offset}&limit=${body.limit}`
  //     // options
  //   );
  // }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>("products").pipe(
      catchError(e => {
        console.log(e);
        return of([]);
      })
    );
  }
  getProductsId(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(id);
  }
}
