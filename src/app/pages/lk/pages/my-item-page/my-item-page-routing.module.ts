import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "src/app/shared/guards/auth-guard/auth.guard";
import { MyItemPageComponent } from "./my-item-page.component";
import { notFoundAdvertInfoResolver } from "src/app/shared/resolvers/not-found-advert-info/not-found-advert-info.resolver";

const routes: Routes = [
  {
    path: "",
    canActivate: [authGuard],
    component: MyItemPageComponent,
  },
  {
    path: "edit/:info",
    canActivate: [authGuard],
    resolve: [notFoundAdvertInfoResolver],
    loadChildren: () =>
      import("../new-item-page/new-item-page.module").then(m => m.NewItemPageModule),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class MyItemPageRoutingModule {}
