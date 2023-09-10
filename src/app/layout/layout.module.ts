import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { SearchComponent } from "./header/search/search.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AllCategoriesComponent } from './header/all-categories/all-categories.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, SearchComponent, AllCategoriesComponent],
  imports: [SharedModule],
  exports: [FooterComponent, HeaderComponent],
})
export class LayoutModule {}
