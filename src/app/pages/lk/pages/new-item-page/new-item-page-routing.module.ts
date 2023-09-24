import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewItemPageComponent} from "./new-item-page.component";

const routes: Routes = [
  {
    path: "",
    component: NewItemPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class NewItemPageRoutingModule {}
