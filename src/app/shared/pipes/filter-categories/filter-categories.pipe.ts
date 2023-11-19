import { Pipe, PipeTransform } from "@angular/core";

import { ICategoryChild } from "src/app/shared/types/category.interface";

@Pipe({
  name: "filterCategories",
})
export class FilterCategoriesPipe implements PipeTransform {
  transform(categories: ICategoryChild[], activeCategory: string): ICategoryChild[] {
    if (!activeCategory) {
      return categories;
    }

    return categories.filter(el => el.name === activeCategory);
  }
}
