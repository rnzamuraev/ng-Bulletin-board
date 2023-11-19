import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "**",
    loadChildren: () =>
      import("./pages/not-found-page/not-found-page.module").then(m => m.NotFoundPageModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NotFoundRoutingModule {}
