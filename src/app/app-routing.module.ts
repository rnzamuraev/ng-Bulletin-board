import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProductInfoPageComponent } from "./pages/main/pages/product-info-page/product-info-page.component";
import { SearchPageComponent } from "./pages/main/pages/search-page/search-page.component";

const routes: Routes = [
  // {
  //   path: `sevastopol`,
  //   children: [
  //     {
  //       path: ":category",
  //       title: "",
  //       component: SearchPageComponent,
  //       children: [
  //         {
  //           path: ":category",
  //           title: "",
  //           component: SearchPageComponent,
  //           children: [
  //             {
  //               path: ":category",
  //               title: "",
  //               component: SearchPageComponent,
  //               children: [
  //                 {
  //                   path: ":category",
  //                   title: "",
  //                   component: ProductInfoPageComponent,
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
