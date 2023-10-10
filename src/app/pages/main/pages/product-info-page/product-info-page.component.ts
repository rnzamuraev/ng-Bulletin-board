import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { ProductService } from "src/app/shared/services/product-service/product.service";
import { IProduct } from "src/app/shared/types/products.interface";

@Component({
  selector: "app-product-info-page",
  templateUrl: "./product-info-page.component.html",
  styleUrls: ["./product-info-page.component.scss"],
})
export class ProductInfoPageComponent implements OnInit {
  productId!: string;
  product!: IProduct;
  routerLink!: string;

  constructor(
    private router: Router,
    // private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.getUrlRouts();
  }

  private getUrlRouts(): string[] {
    // console.log(this.router);
    // this.routerLink = this.router.routerState.snapshot.url;
    // console.log(this.routerLink);
    this.getId(this.router.routerState.snapshot.url);
    return this.router.routerState.snapshot.url.split("/");
  }
  private getId(url: string): void {
    this.productId = url.split("/").slice(-1)[0].split("_").slice(-1)[0];
  }

  ngOnInit(): void {
    this.getProductId(this.productId);
  }
  private getProductId(id: string): void {
    this.productService.getProductsId(id).subscribe((data: IProduct) => {
      this.product = data;
      console.log(data);
    });
  }
}
