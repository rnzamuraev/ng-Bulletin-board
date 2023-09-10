import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home-page/components/home/home.component";
// import { NotFoundError } from "rxjs";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { ItemPageComponent } from "./shared/components/item-page/item-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    // loadChildren: () => import("./home-page/home-page.module").then(c => c.HomePageModule),
    pathMatch: "full",
  },
  // {
  //   path: "/:city",
  //   component: HomeComponent,
  //   // loadChildren: () => import("./home-page/home-page.module").then(c => c.HomePageModule),
  // },
  {
    path: "/sevastopol/:category",
    component: HomeComponent,
    // loadChildren: () => import("./home-page/home-page.module").then(c => c.HomePageModule),
  },
  {
    path: "/sevastopol/:category/:subcategory",
    component: ItemPageComponent,
    // loadChildren: () => import("./home-page/home-page.module").then(c => c.HomePageModule),
  },
  {
    path: "/sevastopol/:category/:subcategory/:title-id",
    component: ItemPageComponent,
    // loadChildren: () => import("./home-page/home-page.module").then(c => c.HomePageModule),
  },
  {
    path: "profile",
    component: ProfilePageComponent,
  },
  {
    path: "**",
    // component: NotFoundError,
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
