import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home-page/components/home/home.component";
// import { NotFoundError } from "rxjs";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { NewAnnouncementPageComponent } from "./profile-page/components/new-announcement-page/new-announcement-page.component";
import { SettingsPageComponent } from "./profile-page/components/settings-page/settings-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { AuthComponent } from "./auth/auth.component";

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
  // },
  {
    path: "sevastopol/:category",
    component: HomeComponent,
  },
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
    component: ProfilePageComponent,
    children: [
      { path: "my-announcements", component: NewAnnouncementPageComponent },
      { path: "new-announcement", component: NewAnnouncementPageComponent },
      { path: "settings", component: SettingsPageComponent },
    ],
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
