import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettingsPageComponent } from "./settings-page.component";
import { authGuard } from "src/app/shared/guards/auth-guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    canActivate: [authGuard],
    component: SettingsPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class SettingsPageRoutingModule {}
