import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CardProductComponent } from "src/app/shared/components/card-product/card-product.component";
import { SearchPageComponent } from "./search-page.component";
import { BreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { SearchPageRoutingModule } from "./search-page-routing.module";
import { RouterModule } from "@angular/router";
import { FilterSidebarComponent } from "./components/filter-sidebar/filter-sidebar.component";
import { FormsModule } from "@angular/forms";
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component'

@NgModule({
  declarations: [SearchPageComponent, BreadcrumbsComponent, FilterSidebarComponent],
  imports: [CommonModule, CardProductComponent, SearchPageRoutingModule, RouterModule, FormsModule, LoadingComponent],
  exports: [SearchPageComponent],
})
export class SearchPageModule {}
