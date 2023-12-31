import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AuthService } from "src/app/pages/auth/services/auth-service/auth.service";
import { InputFieldErrorComponent } from "src/app/shared/components/input-field-error/input-field-error.component";
import { InputLoginComponent } from "src/app/shared/components/input-login/input-login.component";
import { InputPasswordComponent } from "src/app/shared/components/input-password/input-password.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./components/login/loginComponent";
import { RegisterComponent } from "./components/register/register.component";

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputFieldErrorComponent,
    InputLoginComponent,
    InputPasswordComponent,
  ],
  exports: [AuthComponent],
  providers: [AuthService],
})
export class AuthModule {}
