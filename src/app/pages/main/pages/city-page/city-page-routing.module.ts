import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { notFoundResolver } from "src/app/shared/resolvers/not-found-resolver/not-found.resolver";
import { CityPageComponent } from "./city-page.component";

const routes: Routes = [
  {
    path: "",
    // pathMatch: "full",
    title: "City",
    component: CityPageComponent,
    resolve: [notFoundResolver],
  },
  // {
  //   path: `:category`,
  //   title: "City",
  //   component: CityPageComponent,
  //   resolve: [notFoundResolver],
  //   // children: [
  //   //   {
  //   //     path: "info/:info",
  //   //     title: "advertInfo",
  //   //     loadChildren: () =>
  //   //       import("../product-info-page/product-info-page.module").then(
  //   //         m => m.ProductInfoPageModule
  //   //       ),
  //   //   },
  //   // ],
  // },
  // {
  //   path: `:category/:subcategory`,
  //   title: "City",
  //   component: CityPageComponent,
  //   resolve: [notFoundResolver],
  //   // children: [
  //   //   {
  //   //     path: "info/:info",
  //   //     title: "advertInfo",
  //   //     loadChildren: () =>
  //   //       import("../product-info-page/product-info-page.module").then(
  //   //         m => m.ProductInfoPageModule
  //   //       ),
  //   //   },
  //   // ],
  // },
  // {
  //   path: `:category/:subcategory/:sub-subcategory`,
  //   title: "Search",
  //   resolve: [notFoundResolver],
  //   component: CityPageComponent,
  //   // children: [
  //   //   {
  //   //     path: "info/:info",
  //   //     title: "advertInfo",
  //   //     loadChildren: () =>
  //   //       import("../product-info-page/product-info-page.module").then(
  //   //         m => m.ProductInfoPageModule
  //   //       ),
  //   //   },
  //   // ],
  // },
  // {
  //   path: ":category",
  //   title: "Search",
  //   loadChildren: () => import("../search-page/search-page.module").then(m => m.SearchPageModule),
  // },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class CityPageRoutingModule {}
