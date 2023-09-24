import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { CategoriesListComponent } from "./components/header/components/categories-list/categories-list.component";
import { SearchInputComponent } from "./components/header/components/search-input/search-input.component";
import { CategoriesBodyComponent } from "./components/header/components/categories-list/components/categories-body/categories-body.component";
import { CategoriesSidebarComponent } from "./components/header/components/categories-list/components/categories-sidebar/categories-sidebar.component";
import { LoadingComponent } from '../shared/components/loading/loading.component'

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CategoriesListComponent,
    SearchInputComponent,
    CategoriesBodyComponent,
    CategoriesSidebarComponent,
  ],
  imports: [CommonModule, FormsModule, LoadingComponent],
  exports: [FooterComponent, HeaderComponent],
})
export class LayoutModule {}
