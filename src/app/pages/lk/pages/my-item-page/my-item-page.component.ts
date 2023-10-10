import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AdvertsService } from "src/app/shared/services/adverts-service/adverts.service";
import { UserService } from "src/app/shared/services/user-service/user.service";
import { IUser } from "src/app/shared/types/user.interface";

@Component({
  selector: "app-my-item-page",
  templateUrl: "./my-item-page.component.html",
  styleUrls: ["./my-item-page.component.scss"],
})
export class MyItemPageComponent implements OnInit, OnDestroy {
  private _unsubscribeGetCurrentUser!: Subscription;

  currentUser: IUser | null = null;
  adverts!: any[];

  constructor(
    private userService: UserService,
    private advertsService: AdvertsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initializeGetCurrentUser();
    this._initializeFetchAdverts();
  }

  //**? При загрузке страницы */
  //** Получаем текущего пользователя если он вошел в аккаунт */
  private _initializeGetCurrentUser() {
    this._unsubscribeGetCurrentUser = this.userService.getCurrentUser.subscribe(
      (data: IUser | null) => {
        console.log(data);
        this.currentUser = data;
      }
    );
  }
  //** Получаем список объявлений текущего пользователя */
  private _initializeFetchAdverts() {
    this.advertsService.fetchAdverts().subscribe(data => {
      console.log(data);
      this.adverts = data;
    });
  }

  //**? После загрузки страницы */
  //** переход по ссылке на другую страницу */
  onGoTo(value: string) {
    this.router.navigateByUrl(`${value}`);
  }

  //** Отписываемся от кастомных подписок */
  ngOnDestroy(): void {
    this._unsubscribeGetCurrentUser.unsubscribe();
  }
}
