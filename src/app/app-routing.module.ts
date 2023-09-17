import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./main/components/home/home.component";
import { CategoryPageComponent } from "./main/components/cities-page/components/category-page/category-page.component";
import { SubcategoryPageComponent } from "./main/components/cities-page/components/category-page/components/subcategory-page/subcategory-page.component";
import { CategoryItemsComponent } from "./main/components/cities-page/components/category-page/components/subcategory-page/components/category-items/category-items.component";
import { AuthComponent } from "./auth/components/auth/auth.component";
import { ProfilePageComponent } from "./profile/components/profile-page/profile-page.component";
import { NewAnnouncementPageComponent } from "./profile/components/profile-page/components/new-announcement-page/new-announcement-page.component";
import { SettingsPageComponent } from "./profile/components/profile-page/components/settings-page/settings-page.component";
import { NotFoundPageComponent } from "./not-found/components/not-found-page/not-found-page.component";
import { CitiesPageComponent } from "./main/components/cities-page/cities-page.component";
import { EStaticVar } from "./shared/types/staticVar.enum";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./main/main.module").then(m => m.MainModule),
  },
  // {
  //   path: "/:city",
  //   component: HomeComponent,
  // },

  // {
  //   path: "sevastopol/:category/:subcategory",
  //   // component: ItemPageComponent,
  // },
  // {
  //   path: "/sevastopol/:category/:subcategory/:title-id",
  //   component: ItemPageComponent,
  // },
  {
    path: "profile/:auth",
    component: AuthComponent,
  },
  {
    path: "profile",
    // component: ProfilePageComponent,
    // redirect: ,
    children: [
      // { path: "my-announcements", component: MyAnnouncementPageComponent },
      { path: "new-announcement", component: NewAnnouncementPageComponent },
      { path: "settings", component: SettingsPageComponent },
    ],
  },
  {
    path: "**",
    loadChildren: () => import("./not-found/not-found.module").then(m => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
