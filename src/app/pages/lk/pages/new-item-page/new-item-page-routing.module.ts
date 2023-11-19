import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewItemPageComponent } from "./new-item-page.component";
import { authGuard } from "src/app/shared/guards/auth-guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    canActivate: [authGuard],
    component: NewItemPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class NewItemPageRoutingModule {}
