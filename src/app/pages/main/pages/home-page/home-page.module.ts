import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CardProductComponent } from "src/app/shared/components/card-product/card-product.component";
import { HomePageRoutingModule } from "./home-page-routing.module";
import { HomePageComponent } from "./home-page.component";
import { LoadingComponent } from "src/app/shared/components/loading/loading.component";

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, HomePageRoutingModule, CardProductComponent, LoadingComponent],
  exports: [HomePageComponent],
})
export class HomePageModule {}
