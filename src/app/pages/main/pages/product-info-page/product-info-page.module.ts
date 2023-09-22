import { NgModule } from "@angular/core";

import { ProductInfoPageComponent } from "./product-info-page.component";
import { ProductInfoPageRoutingModule } from "./product-info-page-routing.module";

@NgModule({
  declarations: [ProductInfoPageComponent],
  imports: [ProductInfoPageRoutingModule],
  exports: [ProductInfoPageComponent],
})
export class ProductInfoPageModule {}
