import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { ErrorPageComponent } from "./error-page.component";
import { ErrorPageRoutingModule } from "./error-page-routing.module";

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, ErrorPageRoutingModule],
  exports: [ErrorPageComponent],
})
export class ErrorPageModule {}
