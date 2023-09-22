import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProductInfoPageComponent } from "./product-info-page.component";

const routes: Routes = [
  {
    path: "",
    component: ProductInfoPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class ProductInfoPageRoutingModule {}
