import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { ICategoryMenu } from "src/app/shared/types/category.interface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$!: Subscription;
  categories!: ICategoryMenu[];
  isOpenMenu = false;
  // isLogin!: boolean;
  isUser!: boolean;
  searchText!: string;

  constructor(
    private router: Router,
    // private router2: ActivatedRoute
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.unsubscribe$ = this.categoryService.getCategory().subscribe((data: ICategoryMenu[]) => {
      this.categories = data;
    });
  }

  //*** Toggle Menu */
  onCloseMenuProps(value: boolean): void {
    this.isOpenMenu = value;
    this.toggleScrolling();
  }
  onToggleMenu(): void {
    this.isOpenMenu = !this.isOpenMenu;
    this.toggleScrolling();
  }
  private toggleScrolling(): void {
    this.isOpenMenu ? this.disableScrolling() : this.enableScrolling();
  }
  private disableScrolling(): void {
    const div = document.createElement("div");
    const body = document.body;
    body.appendChild(div);
    const bodyHeight = body.scrollHeight;
    div.style.width = "100px";
    div.style.height = "100vh";
    bodyHeight > div.getBoundingClientRect().height ? (div.style.overflowY = "scroll") : null;
    body.style.paddingRight = 100 - div.clientWidth + "px";
    div.remove();
    body.style.overflow = "hidden";
  }
  private enableScrolling(): void {
    const body = document.body;
    body.style.overflow = "";
    body.style.paddingRight = "0";
  }

  //*** Search Input */
  getSearchTextProps(value: string): void {
    console.log(value);
    this.onGoTo(value);
  }
  onGoTo(value: string): void {
    this.router.navigateByUrl(`/${value}`);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }
}

// ******************
// private getUser(): void {
// this.stateService.getUser$.subscribe(data => {
//   if (data === null) {
// this.isLogin = false;
//     return;
//   }
//   this.isLogin = true;
//   this.userName = data.name;
// });
// }
