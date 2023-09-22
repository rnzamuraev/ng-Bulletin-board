import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettingsPageComponent } from "./settings-page.component";

const routes: Routes = [
  {
    path: "",
    component: SettingsPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class SettingsPageRoutingModule {}
