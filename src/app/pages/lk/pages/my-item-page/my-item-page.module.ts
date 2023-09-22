import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyItemPageComponent } from "./my-item-page.component";
import { MyItemPageRoutingModule } from "./my-item-page-routing.module";

@NgModule({
  declarations: [MyItemPageComponent],
  imports: [CommonModule, MyItemPageRoutingModule],
  exports: [MyItemPageComponent],
})
export class MyItemPageModule {}
