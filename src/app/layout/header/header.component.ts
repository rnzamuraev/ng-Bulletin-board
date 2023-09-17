import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CategoryService } from "../services/category.service";
import { ICategoryMenu } from "../types/category.interface";

// import { StateService } from "src/app/shared/services/state.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$!: Subscription;
  categories!: ICategoryMenu[];
  public isOpenMenu = false;
  // public isLogin!: boolean;
  public isUser!: boolean;
  public searchText!: string;

  constructor(
    private router: Router, //private stateService: StateService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.unsubscribe$ = this.categoryService.getCategory().subscribe(data => {
      this.categories = data;
    });
  }

  public onCloseMenuProps(data: boolean) {
    this.isOpenMenu = data;
    this.isScrolling();
    console.log("close");
  }
  public onToggleMenu(): void {
    this.isOpenMenu = !this.isOpenMenu;
    this.isScrolling();
    console.log(this.isOpenMenu);
  }
  private isScrolling() {
    this.isOpenMenu ? this.disableScrolling() : this.enableScrolling();
  }
  private disableScrolling() {
    const div = document.createElement("div");
    const body = document.body;
    body.appendChild(div);
    const bodyHeight = body.scrollHeight;
    div.style.width = "100px";
    div.style.height = "100vh";

    // console.log(body.scrollHeight);
    // console.log(div.getBoundingClientRect().height);
    // console.log(bodyHeight > div.getBoundingClientRect().height);

    bodyHeight > div.getBoundingClientRect().height ? (div.style.overflowY = "scroll") : null;
    body.style.paddingRight = 100 - div.clientWidth + "px";
    div.remove();
    body.style.overflow = "hidden";
  }
  private enableScrolling() {
    const body = document.body;
    body.style.overflow = "";
    body.style.paddingRight = "0";
  }

  public getSearchTextProps(data: string) {
    console.log(data);
    this.onGoTo(data);
  }
  public onGoTo(value: string): void {
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
