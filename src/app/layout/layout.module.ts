import { NgModule } from "@angular/core";

import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SearchComponent } from "./header/components/search/search.component";
import { HeaderMenuModule } from "./header/components/header-menu/header-menu.module";
// *************************************
import { CategoriesMenuComponent } from "./header/components/header-menu/components/categories-menu/categories-menu.component";
import { CategoryItemsComponent } from "./header/components/header-menu/components/categories-menu/components/category-items/category-items.component";
import { SidebarMenuComponent } from "./header/components/header-menu/components/categories-menu/components/sidebar-menu/sidebar-menu.component";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SearchComponent,
    CategoriesMenuComponent,
    CategoryItemsComponent,
    SidebarMenuComponent,
  ],
  imports: [SharedModule, HeaderMenuModule],
  exports: [FooterComponent, HeaderComponent],
})
export class LayoutModule {}
