import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CardProductComponent } from "src/app/shared/components/card-product/card-product.component";
import { LoadingComponent } from "src/app/shared/components/loading/loading.component";
import { MyItemPageRoutingModule } from "./my-item-page-routing.module";
import { MyItemPageComponent } from "./my-item-page.component";

@NgModule({
  declarations: [MyItemPageComponent],
  imports: [CommonModule, MyItemPageRoutingModule, CardProductComponent, LoadingComponent],
  exports: [MyItemPageComponent],
})
export class MyItemPageModule {}
