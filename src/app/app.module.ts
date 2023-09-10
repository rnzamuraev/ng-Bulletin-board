import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// import { SharedModule } from "./shared/shared.module";
import { HomePageModule } from "./home-page/home-page.module";
import { ProfilePageModule } from "./profile-page/profile-page.module";
import { LayoutModule } from "./layout/layout.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // SharedModule,
    LayoutModule,
    HomePageModule,
    ProfilePageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
