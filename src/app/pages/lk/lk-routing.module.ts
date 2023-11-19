import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "lk",
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "/",
      },
      {
        path: "my-items",
        title: "Мои объявления",
        loadChildren: () =>
          import("./pages/my-item-page/my-item-page.module").then(m => m.MyItemPageModule),
      },
      {
        path: "new-item",
        title: "Новое объявление",
        loadChildren: () =>
          import("./pages/new-item-page/new-item-page.module").then(m => m.NewItemPageModule),
      },
      {
        path: "settings",
        title: "Настройки",
        loadChildren: () =>
          import("./pages/settings-page/settings-page.module").then(m => m.SettingsPageModule),
      },
    ],
  },
  // {
  //   path: "lk",
  //   pathMatch: "full",
  //   redirectTo: "/",
  // },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class LkRoutingModule {}
