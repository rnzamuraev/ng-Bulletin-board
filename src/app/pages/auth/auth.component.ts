import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "./services/auth-service/auth.service";
import { UserService } from "src/app/shared/services/user-service/user.service";
import { IUser } from "src/app/shared/types/user.interface";
// import { EStaticVar } from "src/app/shared/types/staticVar.enum";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogin = true;
  isOpen!: boolean;
  header!: string;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    console.log("Open Auth Modal");
    this._initializeIsOpen();
  }

  //** Подписываемся на изменения статуса открыть/закрыть окно регистрации/авторизации */
  private _initializeIsOpen() {
    this.authService.show.subscribe((isData: boolean) => {
      this.isOpen = isData;
    });
  }

  //** функция переключения авторизации и регистрации */
  onToggleIsLoginProps(props: boolean) {
    console.log(props);
    this.isLogin = props;
  }

  //** Получаем пользователя после регистрации/авторизации и заносим данные в сервис */
  onGetCurrentUserProps(props: string) {
    if (this.isLogin) {
      //** Authorization */
      this._fetchCurrentUserByToken();
      return;
    }
    //** Register */
    this._fetchCurrentUserById(props);
  }
  private _fetchCurrentUserById(id: string) {
    this.userService.fetchUserById(id).subscribe((user: IUser | null) => {
      this._setCurrentUser(user);
    });
  }
  private _fetchCurrentUserByToken() {
    this.userService.fetchCurrentUser.subscribe((user: IUser | null) => {
      this._setCurrentUser(user);
    });
  }
  private _setCurrentUser(user: IUser | null) {
    this.userService.setCurrentUser(user);
  }

  ngOnDestroy(): void {
    console.log("Close Auth Modal");
  }
}
