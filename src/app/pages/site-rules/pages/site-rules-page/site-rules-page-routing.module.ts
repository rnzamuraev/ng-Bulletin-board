import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { SiteRulesPageComponent } from "./site-rules-page.component";

const routes: Routes = [
  {
    path: "",
    component: SiteRulesPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SiteRulesPageRoutingModule {}
