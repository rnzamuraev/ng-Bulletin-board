import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "src/app/shared/shared.module";
import { HomeComponent } from "./components/home/home.component";
import { CategorySearchComponent } from "./components/cities-page/components/category-search/category-search.component";
import { CategoryPageComponent } from "./components/cities-page/components/category-page/category-page.component";
import { SubcategoryPageComponent } from "./components/cities-page/components/category-page/components/subcategory-page/subcategory-page.component";
import { CategoryItemsComponent } from "./components/cities-page/components/category-page/components/subcategory-page/components/category-items/category-items.component";
import { CitiesPageComponent } from "./components/cities-page/cities-page.component";
import { EStaticVar } from "../shared/types/staticVar.enum";
import { ItemPageComponent } from "./components/cities-page/components/item-page/item-page.component";
// import { CardModule } from "../shared/components/card/card.module";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
    children: [],
  },
  {
    path: `${EStaticVar.PATH_CITY}`,
    component: CitiesPageComponent,
    title: "City",
    children: [
      {
        path: ":category",
        component: CategoryPageComponent,
        title: "",
        children: [
          {
            path: ":category",
            title: "",
            component: SubcategoryPageComponent,
            children: [
              {
                path: ":category",
                title: "",
                component: CategoryItemsComponent,
                children: [
                  {
                    path: ":category",
                    component: ItemPageComponent,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    CategorySearchComponent,
    CategoryPageComponent,
    SubcategoryPageComponent,
    CategoryItemsComponent,
    CitiesPageComponent,
    ItemPageComponent,
  ],
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [HomeComponent, CitiesPageComponent],
})
export class MainModule {}
