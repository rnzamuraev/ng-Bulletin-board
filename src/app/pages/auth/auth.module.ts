import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AuthService } from "src/app/pages/auth/services/auth-service/auth.service";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [AuthComponent],
  providers: [AuthService],
})
export class AuthModule {
  // static forRoot(): ModuleWithProviders<AuthModule> {
  //   return {
  //     ngModule: AuthModule,
  //     providers: [AuthService],
  //   };
  // }
}
