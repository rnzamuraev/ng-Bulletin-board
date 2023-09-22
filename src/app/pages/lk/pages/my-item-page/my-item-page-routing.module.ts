import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyItemPageComponent } from "./my-item-page.component";

const routes: Routes = [
  {
    path: "",
    component: MyItemPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class MyItemPageRoutingModule {}
