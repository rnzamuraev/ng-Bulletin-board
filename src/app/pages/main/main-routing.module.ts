import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { notFoundResolver } from "src/app/shared/resolvers/not-found-resolver/not-found.resolver";
import { CityPageComponent } from "./pages/city-page/city-page.component";
// import { notFoundResolver } from "src/app/shared/resolvers/not-found-resolver/not-found.resolver";
// import { CityPageComponent } from "./pages/city-page/city-page.component";

const routes = (): Routes => {
  localStorage.setItem("__city__", JSON.stringify({ origin: "Москва", translit: "moskva" }));
  let city = localStorage.getItem("__city__")?.toLowerCase().trim();
  if (city) {
    city = JSON.parse(city).translit;
  } else city = "all";
  console.log(city);
  const routes: Routes = [
    {
      path: "",
      pathMatch: "full",
      loadChildren: () => import("./pages/home-page/home-page.module").then(m => m.HomePageModule),
    },
    {
      path: `info/:info`,
      pathMatch: "full",
      title: "advertInfo",
      loadChildren: () =>
        import("./pages/product-info-page/product-info-page.module").then(
          m => m.ProductInfoPageModule
        ),
    },
    {
      // path: `${city}/:category/:subcategory/:sub-subcategory`,
      path: `${city}`,
      pathMatch: "full",
      title: "City",
      loadChildren: () => import("./pages/city-page/city-page.module").then(m => m.CityPageModule),
    },
    {
      path: `${city}/:category`,
      title: "City",
      component: CityPageComponent,
      resolve: [notFoundResolver],
      //   children: [
      //     {
      //       path: "ad/:info",
      //       title: "advertInfo",
      //       loadChildren: () =>
      //         import("./pages/product-info-page/product-info-page.module").then(
      //           m => m.ProductInfoPageModule
      //         ),
      //     },
      //   ],
    },
    {
      path: `${city}/:category/:subcategory`,
      title: "City",
      component: CityPageComponent,
      resolve: [notFoundResolver],
      //   children: [
      //     {
      //       path: "ad/:info",
      //       title: "advertInfo",
      //       loadChildren: () =>
      //         import("./pages/product-info-page/product-info-page.module").then(
      //           m => m.ProductInfoPageModule
      //         ),
      //     },
      //   ],
    },
    {
      path: `${city}/:category/:subcategory/:sub-subcategory`,
      title: "City",
      component: CityPageComponent,
      resolve: [notFoundResolver],
      //   //   children: [
      //   //     {
      //   //       path: "ad/:info",
      //   //       title: "advertInfo",
      //   //       loadChildren: () =>
      //   //         import("./pages/product-info-page/product-info-page.module").then(
      //   //           m => m.ProductInfoPageModule
      //   //         ),
      //   //     },
      //   //   ],
    },
  ];
  return routes;
};

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes())],
})
export class MainRoutingModule {
  constructor() {}
}
