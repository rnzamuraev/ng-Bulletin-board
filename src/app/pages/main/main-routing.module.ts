import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SearchPageComponent } from "./pages/search-page/search-page.component";
import { ProductInfoPageComponent } from "./pages/product-info-page/product-info-page.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadChildren: () => import("./pages/home-page/home-page.module").then(m => m.HomePageModule),
  },
  {
    path: "sevastopol",
    // pathMatch: "full",
    loadChildren: () =>
      import("./pages/search-page/search-page.module").then(m => m.SearchPageModule),
  },
  {
    path: `sevastopol`,
    title: "Севастополь",
    children: [
      {
        path: ":category",
        title: "",
        component: SearchPageComponent,
        children: [
          {
            path: ":category",
            title: "",
            // component: SearchPageComponent,s
            children: [
              {
                path: ":category",
                title: "",
                // component: SearchPageComponent,s
                children: [
                  {
                    path: ":category",
                    title: "",
                    loadChildren: () =>
                      import("./pages/product-info-page/product-info-page.module").then(
                        m => m.ProductInfoPageModule
                      ),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // {
  //   path: "sevastopol",
  //   pathMatch: "full",
  //   redirectTo: "/",
  // },
  {
    path: "info/:id",
    pathMatch: "full",
    redirectTo: "/",
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MainRoutingModule {}
