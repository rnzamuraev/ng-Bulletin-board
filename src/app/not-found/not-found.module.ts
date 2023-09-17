import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
// import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { NotFoundPageComponent } from "./components/not-found-page/not-found-page.component";

const routes: Routes = [
  {
    path: "",
    // component: NotFoundPageComponent
    loadChildren: () =>
      import("./components/not-found-page/not-found-page.component").then(
        c => c.NotFoundPageComponent
      ),
  },
];
@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [NotFoundPageComponent],
})
export class NotFoundModule {}
