import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { QueryParamsService } from "src/app/shared/services/query-params-service/query-params.service";
import { INewCategory } from "src/app/shared/types/category.interface";
// import { EStaticVar } from "src/app/shared/types/staticVar.enum";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.scss"],
})
export class CategoriesListComponent implements OnInit {
  city = "Севастополь";
  activeMenuCategory!: INewCategory;
  numberOfColumns = 3;
  categoryIdColumnCard!: number;
  categoryIdColumnCard2!: number;

  // @Input("categoriesProps")
  @Input()
  categoriesProps!: INewCategory[];
  // set getCategories(props: ICategoryMenu[]) {
  //   this.categories = props;
  // }

  @Output()
  closeMenu = new EventEmitter<boolean>();

  constructor(private queryParamsService: QueryParamsService, private router: Router) {}

  ngOnInit(): void {
    this.initializeActiveCategory();
  }

  private initializeActiveCategory(): void {
    if (!this.activeMenuCategory) {
      this.activeMenuCategory = this.categoriesProps[0];
      this.getCategoryIdInColumnCard(this.categoriesProps[0]);
    }
  }

  private getCategoryIdInColumnCard(data: INewCategory): void {
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
      if (sum < quantityItemsOneColumn) {
        return;
      }

      if (sum >= quantityItemsOneColumn) {
        if (!column1) {
          column1 = count;
          sum = 0;
          return;
        } else {
          column2 = count;
          sum = 0;
          return;
        }
      }
    });
    console.log("id-1: ", column1);
    console.log("id-2: ", column2);
    this.categoryIdColumnCard = column1;
    this.categoryIdColumnCard2 = column2;
  }
  private getTotalNumberOfSubcategories(data: INewCategory, arrNum: number[]): number {
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

  onActiveMenuCategoryProps(data: INewCategory): void {
    this.activeMenuCategory = data;
    this.getCategoryIdInColumnCard(data);
  }

  onGetSubcategoryLinkProps(props: string): void {
    console.log(`${this.activeMenuCategory.name}/${props}`);
    this.onGoTo(`${this.activeMenuCategory.name}/${props}`);
  }
  onGetCategoryLink(data: string): void {
    this.onGoTo(data);
  }
  onGoTo(data: string): void {
    this.closeMenu.emit(false);
    // this.categoryService.setBreadcrumbsLabels$(data.split("/"));
    this.router.navigateByUrl(`/${this.queryParamsService.transliter(this.city + "/" + data)}`);
  }
}
