import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SiteRulesPageRoutingModule } from "./site-rules-page-routing.module";
import { SiteRulesPageComponent } from "./site-rules-page.component";

@NgModule({
  declarations: [SiteRulesPageComponent],
  imports: [CommonModule, SiteRulesPageRoutingModule],
  exports: [SiteRulesPageComponent],
})
export class SiteRulesPageModule {}
