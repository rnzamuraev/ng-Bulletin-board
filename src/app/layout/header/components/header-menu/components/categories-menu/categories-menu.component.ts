import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { EStaticVar } from "src/app/shared/types/staticVar.enum";
import { CategoryService } from "../../../../../services/category.service";
import { ICategoryMenu } from "../../../../../types/category.interface";

@Component({
  selector: "app-categories-menu",
  templateUrl: "./categories-menu.component.html",
  styleUrls: ["./categories-menu.component.scss"],
})
export class CategoriesMenuComponent implements OnInit, OnDestroy {
  private converter = [
    ["а", "a"],
    ["б", "b"],
    ["в", "v"],
    ["г", "g"],
    ["д", "d"],
    ["е", "e"],
    ["ё", "e"],
    ["ж", "zh"],
    ["з", "z"],
    ["и", "i"],
    ["й", "y"],
    ["к", "k"],
    ["л", "l"],
    ["м", "m"],
    ["н", "n"],
    ["о", "o"],
    ["п", "p"],
    ["р", "r"],
    ["с", "s"],
    ["т", "t"],
    ["у", "u"],
    ["ф", "f"],
    ["х", "h"],
    ["ц", "ts"],
    ["ч", "ch"],
    ["ш", "sh"],
    ["щ", "sch"],
    ["ь", ""],
    ["ы", "y"],
    ["ъ", ""],
    ["э", "e"],
    ["ю", "yu"],
    ["я", "ya"],
    [" ", "_"],
    [",", ""],
    ["/", "/"],
  ];
  private unsubscribe$!: Subscription;
  public city = "Севастополь";
  public activeMenuCategory!: ICategoryMenu;
  public categories!: ICategoryMenu[];
  public subcategoryIdCol!: number;
  public subcategoryIdCol2!: number;

  @Input("categoriesProps")
  public set getCategory(props: ICategoryMenu[]) {
    this.categories = props;

    if (!this.activeMenuCategory) {
      this.activeMenuCategory = props[0];
      this.getCardId(props[0]);
    }
  }

  @Output()
  public closeMenu = new EventEmitter<boolean>();

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    // this.getCategories();
  }

  // private getCategories() {
  //   this.unsubscribe$ = this.categoryService.getCategory().subscribe(data => {
  //     this.categories = data;

  //     if (!this.activeMenuCategory) {
  //       this.activeMenuCategory = data[0];
  //       this.getCardId(data[0]);
  //     }
  //   });
  // }

  private getCardId(data: ICategoryMenu) {
    const q = data.body.length;
    let totalQ = 0;
    const arr: number[] = [];
    data.body.forEach(el => {
      if (el.body && el.body.length) {
        if (el.body.length > 6) {
          totalQ += 6;
          arr.push(6);
        } else {
          totalQ += el.body.length;
          arr.push(el.body.length);
        }
      } else {
        totalQ += 2;
        arr.push(2);
      }
    });
    console.log(arr);
    console.log(totalQ);

    // const col = Math.ceil(totalQ / 3);
    const col = Math.floor(totalQ / 3);
    console.log(col);
    let count = 0;
    let col1 = 0;
    let col2 = 0;
    let sum = 0;
    arr.forEach(el => {
      count++;
      sum += el;
      console.log("count ", count);
      console.log("el: ", el);
      console.log("sum: ", sum);
      if (sum <= col) {
        return;
      } else if (sum > col) {
        if (col1 === 0) {
          col1 = count;
          console.log(col1);
          sum = 0;
        } else {
          col2 = count;
          console.log(col2);
          return;
        }
      }
    });
    console.log("id-1: ", col1);
    console.log("id-2: ", col2);
    this.subcategoryIdCol = col1;
    this.subcategoryIdCol2 = col2;
  }

  // public onGetCategory(data: ICategoryMenu): void {
  //   this.categoryMenu = data;
  // }
  public onActiveMenuCategoryProps(data: ICategoryMenu): void {
    this.activeMenuCategory = data;
    this.getCardId(data);
  }

  onGetSubcategoryLinkProps(props: string) {
    console.log(`${this.activeMenuCategory.category}/${props}`);
    this.onGoTo(`${this.activeMenuCategory.category}/${props}`);
  }
  public onGetCategoryLink(data: string) {
    this.onGoTo(data);
  }
  public onGoTo(data: string): void {
    // this.closeMenu.emit(false);
    console.log(data.split("/"));
    const categories = data.split("/");
    console.log(this.transliter(data));
    this.router.config.forEach(el => {
      console.log(el);
      if (el.path === EStaticVar.PATH_CITY) {
        el.title = `${this.city}`;
        el.children?.forEach(el => {
          console.log(el);
          el.title = `${categories[0]}`;
          el.children?.forEach(el => {
            console.log(el);
            el.title = `${categories[1]}`;
            el.children?.forEach(el => {
              console.log(el);
              el.title = `${categories[2]}`;
            }); // TODO
          });
        });
      }
    });
    console.log(this.router.config);
    this.router.navigateByUrl(this.transliter(`/${this.city}/${data}`));
  }
  private transliter(str: string) {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      this.converter.forEach(el => {
        if (str.toLowerCase().trim()[i] !== el[0]) return;

        newStr += el[1];
      });
    }
    return newStr;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }
}
