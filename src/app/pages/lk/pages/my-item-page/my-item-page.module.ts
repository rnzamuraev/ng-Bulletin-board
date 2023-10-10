import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyItemPageComponent } from "./my-item-page.component";
import { MyItemPageRoutingModule } from "./my-item-page-routing.module";
import { CardProductComponent } from 'src/app/shared/components/card-product/card-product.component'

@NgModule({
  declarations: [MyItemPageComponent],
  imports: [CommonModule, MyItemPageRoutingModule, CardProductComponent],
  exports: [MyItemPageComponent],
})
export class MyItemPageModule {}
