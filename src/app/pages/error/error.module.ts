import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ErrorRoutingModule } from "./error-routing.module";

@NgModule({
  imports: [CommonModule, ErrorRoutingModule],
})
export class ErrorModule {}
