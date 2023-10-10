import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterCategoriesPipe } from "./filter-categories/filter-categories.pipe";

@NgModule({
  declarations: [FilterCategoriesPipe],
  imports: [],
  exports: [FilterCategoriesPipe],
})
export class PipesModule {}
