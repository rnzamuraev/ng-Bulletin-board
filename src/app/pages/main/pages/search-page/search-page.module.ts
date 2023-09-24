import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CardProductComponent } from "src/app/shared/components/card-product/card-product.component";
import { SearchPageComponent } from "./search-page.component";
import { BreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { SearchPageRoutingModule } from "./search-page-routing.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [SearchPageComponent, BreadcrumbsComponent],
  imports: [CommonModule, CardProductComponent, SearchPageRoutingModule, RouterModule],
  exports: [SearchPageComponent],
})
export class SearchPageModule {}
