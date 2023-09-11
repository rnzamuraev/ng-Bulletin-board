import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { StateService } from "src/app/shared/services/state.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isLogin!: boolean;
  public userName!: string;
  public searchText!: string;
  public menuCategory = [
    "Транспорт",
    "Недвижимость",
    "Работа",
    "Услуги",
    "Личные вещи",
    "Для дома",
    "Автозапчасти и аксессуары",
    "Электроника",
    "Хобби и отдых",
    "Животные",
    "Бизнес и оборудование",
  ];

  constructor(
    private router: Router, //
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.getUser();
    // this.getSearch$();
  }

  public getSearchTextProps(data: string) {
    console.log(data);
  }

  // private getSearch$() {
  //   this.stateService.getSearch$.subscribe(data => {
  //     this.searchText = data;
  //   });
  // }

  private getUser(): void {
    // this.stateService.getUser$.subscribe(data => {
    //   if (data === null) {
    this.isLogin = false;
    //     return;
    //   }
    //   this.isLogin = true;
    //   this.userName = data.name;
    // });
  }

  public onGoTo(value: string): void {
    // if (value === "logout") {
    //   this.stateService.setUser$(null);
    //   value = "";
    // }

    this.router.navigate([`/${value}`]);
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      console.log("timeout отработал");
    }, 5000);
  }
}
