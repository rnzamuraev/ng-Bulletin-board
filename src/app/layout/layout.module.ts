import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SearchComponent } from "./header/components/search/search.component";
import { AllCategoriesComponent } from "./header/components/all-categories/all-categories.component";

@NgModule({
  declarations: [FooterComponent, HeaderComponent, SearchComponent, AllCategoriesComponent],
  imports: [SharedModule],
  exports: [FooterComponent, HeaderComponent],
})
export class LayoutModule {}
