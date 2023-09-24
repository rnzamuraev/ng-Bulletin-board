import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { ProductInfoPageRoutingModule } from "./product-info-page-routing.module";
import { ProductInfoPageComponent } from "./product-info-page.component";
import { LoadingComponent } from "src/app/shared/components/loading/loading.component";

@NgModule({
  declarations: [ProductInfoPageComponent],
  imports: [CommonModule, ProductInfoPageRoutingModule, LoadingComponent],
  exports: [ProductInfoPageComponent],
})
export class ProductInfoPageModule {}
