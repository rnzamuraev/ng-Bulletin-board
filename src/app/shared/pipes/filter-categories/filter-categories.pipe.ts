import { Pipe, PipeTransform } from "@angular/core";

import { ICategoryMenu } from "src/app/shared/types/category.interface";

@Pipe({
  name: "filterCategories",
})
export class FilterCategoriesPipe implements PipeTransform {
  transform(categories: ICategoryMenu[], activeCategory: string): ICategoryMenu[] {
    if (!activeCategory) {
      return categories;
    }

    return categories.filter(el => el.category === activeCategory);
  }
}
