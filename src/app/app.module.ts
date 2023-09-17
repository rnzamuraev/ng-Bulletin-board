import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { LayoutModule } from "./layout/layout.module";
import { MainModule } from "./main/main.module";
import { NotFoundModule } from "./not-found/not-found.module";
import { ProfileModule } from "./profile/profile.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    // SharedModule,
    LayoutModule,
    MainModule,
    ProfileModule,
    NotFoundModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
