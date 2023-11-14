import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { NgxDadataModule } from "@kolkov/ngx-dadata";
// import { HttpClientModule } from "@angular/common/http";

import { InputFieldErrorComponent } from "src/app/shared/components/input-field-error/input-field-error.component";
import { InputLoginComponent } from "src/app/shared/components/input-login/input-login.component";
import { InputPasswordComponent } from "src/app/shared/components/input-password/input-password.component";
import { PasswordFormComponent } from "./components/password-form/password-form.component";
import { SettingsFormComponent } from "./components/settings-form/settings-form.component";
import { SettingsPageRoutingModule } from "./settings-page-routing.module";
import { SettingsPageComponent } from "./settings-page.component";
// import { NgxDadataModule } from "@kolkov/ngx-dadata/public-api";

@NgModule({
  declarations: [SettingsPageComponent, SettingsFormComponent, PasswordFormComponent],
  imports: [
    CommonModule,
    SettingsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputFieldErrorComponent,
    InputLoginComponent,
    InputPasswordComponent,
    // NgxDadataModule,
    // HttpClientModule,
  ],
  exports: [SettingsPageComponent],
})
export class SettingsPageModule {}
