import { NgModule } from "@angular/core";

import { FormComponent } from "src/app/auth/components/form/form.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [FormComponent, AuthComponent],
  imports: [SharedModule],
})
export class AuthModule {}
