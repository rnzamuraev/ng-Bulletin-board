import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DropdownModule } from "primeng/dropdown";

import { CardProductComponent } from "src/app/shared/components/card-product/card-product.component";
import { LoadingComponent } from "src/app/shared/components/loading/loading.component";
// import { FilterSidebarComponent } from "../search-page/components/filter-sidebar/filter-sidebar.component";
// import { SortComponent } from "../search-page/components/sort/sort.component";
import { CityPageRoutingModule } from "./city-page-routing.module";
import { CityPageComponent } from "./city-page.component";
// import { BreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { NotFoundComponent } from "src/app/shared/components/not-found/not-found.component";
import { SortComponent } from "./components/sort/sort.component";
import { FilterSidebarComponent } from "./components/filter-sidebar/filter-sidebar.component";
import { BreadcrumbsComponent } from "src/app/shared/components/breadcrumbs/breadcrumbs.component";
import { InputNumberComponent } from 'src/app/shared/components/input-number/input-number.component'

@NgModule({
  declarations: [CityPageComponent, FilterSidebarComponent, SortComponent],
  exports: [CityPageComponent],
  imports: [
    CommonModule,
    CardProductComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
    DropdownModule,
    CityPageRoutingModule,
    BreadcrumbsComponent,
    NotFoundComponent,
    InputNumberComponent,
  ],
})
export class CityPageModule {}
