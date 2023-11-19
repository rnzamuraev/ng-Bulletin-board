import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProductInfoPageComponent } from "./product-info-page.component";
// import { notFoundResolver } from "src/app/shared/resolvers/not-found-resolver/not-found.resolver";
import { notFoundAdvertInfoResolver } from "src/app/shared/resolvers/not-found-advert-info/not-found-advert-info.resolver";

const routes: Routes = [
  {
    path: "",
    component: ProductInfoPageComponent,
    resolve: [notFoundAdvertInfoResolver],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class ProductInfoPageRoutingModule {}
