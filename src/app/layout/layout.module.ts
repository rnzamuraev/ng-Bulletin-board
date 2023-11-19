import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { LoadingComponent } from "src/app/shared/components/loading/loading.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CategoriesListComponent } from "./components/header/components/categories-list/categories-list.component";
import { CategoriesBodyComponent } from "./components/header/components/categories-list/components/categories-body/categories-body.component";
import { CategoriesSidebarComponent } from "./components/header/components/categories-list/components/categories-sidebar/categories-sidebar.component";
import { SearchInputComponent } from "./components/header/components/search-input/search-input.component";
import { HeaderComponent } from "./components/header/header.component";
import { DropdownComponent } from "./components/header/components/dropdown/dropdown.component";
// import { AuthModule } from "../pages/auth/auth.module";
import { AuthService } from "../pages/auth/services/auth-service/auth.service";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CategoriesListComponent,
    SearchInputComponent,
    CategoriesBodyComponent,
    CategoriesSidebarComponent,
    DropdownComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // AuthModule.forRoot()
    LoadingComponent,
  ],
  exports: [FooterComponent, HeaderComponent],
  providers: [AuthService],
})
export class LayoutModule {}
