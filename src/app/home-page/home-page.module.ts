import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { HomeComponent } from "./components/home/home.component";
import { RouterModule, Routes } from "@angular/router";
// import { CardModule } from "../shared/components/card/card.module";

// const routes: Routes = [
//   {
//     path: "",
//     component: HomeComponent,
//     children: [],
//   },
// ];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    // RouterModule.forChild(routes),
    SharedModule,
  ],
  // exports: [RouterModule],
})
export class HomePageModule {}
