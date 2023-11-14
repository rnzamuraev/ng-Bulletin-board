import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "rules",
    title: "Правила сайта",
    loadChildren: () =>
      import("./pages/site-rules-page/site-rules-page.module").then(m => m.SiteRulesPageModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SiteRulesRoutingModule {}
