import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { ICategoryMenu } from "src/app/shared/types/category.interface";
import { EStaticVar } from "src/app/shared/types/staticVar.enum";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.scss"],
})
export class CategoriesListComponent implements OnInit {
  activeMenuCategory!: ICategoryMenu;
  numberOfColumns = 3;
  categoryIdColumnCard!: number;
  categoryIdColumnCard2!: number;

  @Input()
  categoriesProps!: ICategoryMenu[];

  @Output()
  closeMenu = new EventEmitter<boolean>();

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.initialActiveCategory();
  }

  private initialActiveCategory(): void {
    if (!this.activeMenuCategory) {
      this.activeMenuCategory = this.categoriesProps[0];
      this.getCategoryIdInColumnCard(this.categoriesProps[0]);
    }
  }

  private getCategoryIdInColumnCard(data: ICategoryMenu): void {
    let column1!: number;
    let column2!: number;
    let count = 0;
    let sum = 0;
    const arrayNumberOfSubcategories: number[] = [];
    let totalNumberOfSubcategories = this.getTotalNumberOfSubcategories(
      data,
      arrayNumberOfSubcategories
    );

    console.log(arrayNumberOfSubcategories);
    console.log(totalNumberOfSubcategories);

    const quantityItemsOneColumn = Math.floor(totalNumberOfSubcategories / this.numberOfColumns);
    console.log(quantityItemsOneColumn);

    arrayNumberOfSubcategories.forEach((elem: number) => {
      count++;
      sum += elem;
      console.log("count ", count);
      console.log("el: ", elem);
      console.log("sum: ", sum);
      if (sum <= quantityItemsOneColumn) {
        return;
      }

      if (sum > quantityItemsOneColumn) {
        if (!column1) {
          column1 = count;
          console.log(column1);
          sum = 0;
        } else {
          column2 = count;
          console.log(column2);
          return;
        }
      }
    });
    console.log("id-1: ", column1);
    console.log("id-2: ", column2);
    this.categoryIdColumnCard = column1;
    this.categoryIdColumnCard2 = column2;
  }
  private getTotalNumberOfSubcategories(data: ICategoryMenu, arrNum: number[]): number {
    let sum = 0;
    data.body.forEach(el => {
      if (el.body && el.body.length) {
        if (el.body.length > 6) {
          sum += 6;
          arrNum.push(6);
        } else {
          sum += el.body.length;
          arrNum.push(el.body.length);
        }
      } else {
        sum += 2;
        arrNum.push(2);
      }
    });
    return sum;
  }

  onActiveMenuCategoryProps(data: ICategoryMenu): void {
    this.activeMenuCategory = data;
    this.getCategoryIdInColumnCard(data);
  }

  onGetSubcategoryLinkProps(props: string): void {
    console.log(`${this.activeMenuCategory.category}/${props}`);
    this.onGoTo(`${this.activeMenuCategory.category}/${props}`);
  }
  onGetCategoryLink(data: string): void {
    this.onGoTo(data);
  }
  onGoTo(data: string): void {
    this.closeMenu.emit(false);

    this.router.navigateByUrl(this.categoryService.transliter(`/${EStaticVar.CITY_TITLE}/${data}`));
  }
}
