import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription, of, switchMap, tap } from "rxjs";
import { AdvertService } from "src/app/shared/services/adverts-service/advert.service";
import { ImageService } from "src/app/shared/services/image-service/image.service";
import { QueryParamsService } from "src/app/shared/services/query-params-service/query-params.service";
import { UserService } from "src/app/shared/services/user-service/user.service";
import { IAdvertUser } from "src/app/shared/types/adverts.interface";
import { IError } from "src/app/shared/types/error.interface";
import { IUser } from "src/app/shared/types/user.interface";

@Component({
  selector: "app-my-item-page",
  templateUrl: "./my-item-page.component.html",
  styleUrls: ["./my-item-page.component.scss"],
})
export class MyItemPageComponent implements OnInit, OnDestroy {
  private _unsubscribeGetCurrentUser!: Subscription;

  currentUser: IUser | null = null;
  error!: IError;
  adverts!: IAdvertUser[];

  constructor(
    private userService: UserService,
    private advertService: AdvertService,
    private queryParamsService: QueryParamsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initializeGetCurrentUser();
    // this._initializeFetchAdverts();
  }

  //**? При загрузке страницы */
  //** Получаем текущего пользователя если он вошел в аккаунт */
  private _initializeGetCurrentUser() {
    this._unsubscribeGetCurrentUser = this.userService.getCurrentUser$.subscribe(
      (data: IUser | null) => {
        console.log(data);
        this.currentUser = data;
        if (data) this._currentUserAdverts(data);
      }
    );
  }
  //** Получаем список объявлений текущего пользователя */
  private _currentUserAdverts(data: IUser) {
    this.adverts = data.adverts;
    console.log(this.adverts);
  }
  // private _initializeFetchAdverts() {
  //   this.advertsService.fetchAdverts().subscribe(data => {
  //     console.log(data);
  //     this.adverts = data;
  //   });
  // }

  //** После загрузки страницы */
  //** переход по ссылке на другую страницу */
  onDeleteAdvertProps(props: string) {
    console.log(props);
    // this._deleteAdvert(props);
    this.advertService
      .deleteAdvert(props)
      .pipe(
        switchMap((data: IError | null) => {
          if (data === null) {
            if (this.currentUser) {
              return this.userService.fetchUserById(this.currentUser.id);
            }
            return of(null);
          } else {
            this.error = data;
            return of(null);
          }
        })
      )
      .subscribe(data => {
        console.log(data);
        if (data) this.userService.setCurrentUser(data);
      });
  }

  //** переход по ссылке на другую страницу */
  onGoTo(value: string) {
    this.router.navigateByUrl(`${value}`);
  }

  //** Отписываемся от кастомных подписок */
  ngOnDestroy(): void {
    this._unsubscribeGetCurrentUser.unsubscribe();
  }
}
