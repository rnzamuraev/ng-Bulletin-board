import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BASE_URL, BASE_URL_TOKEN, DADATA_URL, DADATA_URL_TOKEN } from "./config.API";
import { LayoutModule } from "./layout/layout.module";
import { AuthModule } from "./pages/auth/auth.module";
import { LkModule } from "./pages/lk/lk.module";
import { MainModule } from "./pages/main/main.module";
import { NotFoundModule } from "./pages/not-found/not-found.module";
import { SiteRulesModule } from "./pages/site-rules/site-rules.module";
import { MyInterceptorService } from "./shared/services/my-interceptor-service/my-interceptor.service";
import { DadataInterceptorService } from "./pages/lk/services/dadata-interceptor-service/dadata-interceptor.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MainModule,
    LkModule,
    // AuthModule.forRoot(),
    AuthModule,
    NotFoundModule,
    SiteRulesModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DadataInterceptorService,
      multi: true,
    },
    {
      provide: BASE_URL_TOKEN,
      useValue: BASE_URL,
      multi: true,
    },
    {
      provide: DADATA_URL_TOKEN,
      useValue: DADATA_URL,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
