import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NewItemPageComponent } from "./new-item-page.component";
import { NewItemPageRoutingModule } from "./new-item-page-routing.module";

@NgModule({
  declarations: [NewItemPageComponent],
  imports: [CommonModule, NewItemPageRoutingModule],
  exports: [NewItemPageComponent],
})
export class NewItemPageModule {}
