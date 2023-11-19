import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { ProductInfoPageRoutingModule } from "./product-info-page-routing.module";
import { ProductInfoPageComponent } from "./product-info-page.component";
import { LoadingComponent } from "src/app/shared/components/loading/loading.component";
import { NoImageComponent } from "src/app/shared/components/no-image/no-image.component";
import { ShowPhoneComponent } from "./components/show-phone/show-phone.component";
import { CustomCurrencyPipe } from "src/app/shared/pipes/custom-currency/custom-currency.pipe";
import { NotFoundComponent } from "src/app/shared/components/not-found/not-found.component";
import { BreadcrumbsComponent } from 'src/app/shared/components/breadcrumbs/breadcrumbs.component'

@NgModule({
  declarations: [ProductInfoPageComponent, ShowPhoneComponent],
  imports: [
    CommonModule,
    ProductInfoPageRoutingModule,
    LoadingComponent,
    NoImageComponent,
    CustomCurrencyPipe,
    NotFoundComponent,
    BreadcrumbsComponent,
  ],
  exports: [ProductInfoPageComponent],
})
export class ProductInfoPageModule {}
