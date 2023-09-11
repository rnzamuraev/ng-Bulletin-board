import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { NotFoundPageComponent } from "./not-found-page.component";

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [SharedModule],
})
export class NotFoundPageModule {}
