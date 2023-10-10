import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { UserService } from "src/app/shared/services/user-service/user.service";
import { IUpdateUser, IUpdateUserResponse, IUser } from "src/app/shared/types/user.interface";
import { DadataService } from "../../services/dadata-service/dadata.service";
import { LocalStorageService } from "src/app/shared/services/local-storage-service/local-storage.service";
import { EStaticVar } from "src/app/shared/types/staticVar.enum";

@Component({
  selector: "app-settings-page",
  templateUrl: "./settings-page.component.html",
  styleUrls: ["./settings-page.component.scss"],
})
export class SettingsPageComponent implements OnInit {
  private _unsubscribeGetCurrentUser!: Subscription;
  private _address = "";
  private _phone = "";
  private _userId = "";

  userUpdateObj!: IUpdateUser;
  settingsForm!: FormGroup;
  changePasswordForm!: FormGroup;
  term!: string;

  constructor(
    private userService: UserService,
    private dadataService: DadataService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    // this._InitializeUserUpdateObj();
    this._initializeLocation();
    this._initializePhone();
    this._initializeGetCurrentUser();
    this._initializeSettingsForm();
    this._initializeChangePasswordForm();
  }

  //**? При загрузке страницы */
  // ** Создаем новый объект для изменения настроек пользователя */
  private _createUserUpdateObj(): IUpdateUser {
    return {
      name: "",
      login: "",
      password: "",
    };
  }
  private _initializeLocation(): void {
    const location = this.localStorage.get(EStaticVar.LOCATION_KEY);
    if (location) {
      this._address = location;
    }
  }
  private _initializePhone(): void {
    const phone = this.localStorage.get(EStaticVar.PHONE_KEY);
    if (phone) {
      this._phone = phone;
    }
  }
  //** Получаем текущего пользователя если он вошел в аккаунт */
  private _initializeGetCurrentUser() {
    this._unsubscribeGetCurrentUser = this.userService.getCurrentUser.subscribe(
      (data: IUser | null) => {
        if (data) {
          this._userId = data.id;
          this.userUpdateObj = { ...this._createUserUpdateObj(), name: data.name };
        }
        console.log(this.userUpdateObj);
      }
    );
  }
  //** Инициализировать форму настроек */
  private _initializeSettingsForm() {
    this.settingsForm = new FormGroup({
      name: new FormControl(this.userUpdateObj.name),
      login: new FormControl(""),
      location: new FormControl(this._address),
    });
  }
  //** Инициализировать форму изменения пароля */
  private _initializeChangePasswordForm() {
    this.changePasswordForm = new FormGroup({
      password: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [Validators.required]),
    });
  }
  fetchAddress(term: string) {
    this.dadataService.fetchAddress(term).subscribe(data => {
      this._address = data;
    });
  }
  onSearchAddress() {
    console.log(this.settingsForm.value["location"]);
    // console.log(this.settingsForm.value.location);
    // this.fetchAddress(this.settingsForm.value["location"]);
  }

  onSubmitSettingsSave() {
    console.log(this.settingsForm);
    this.userUpdateObj.name = this.settingsForm.value.name;
    this.userUpdateObj.login = this.settingsForm.value.login;
    this._setPhone(this.settingsForm.value.login);
    this._setAddress(this.settingsForm.value.location);
    console.log(this.userUpdateObj);
  }
  private _setPhone(phone: string) {
    if (phone) {
      this.localStorage.set(EStaticVar.PHONE_KEY, phone);
    }
  }
  private _setAddress(address: string) {
    if (address) {
      this.localStorage.set(EStaticVar.LOCATION_KEY, address);
    }
  }
  onSubmitChangePassword() {
    console.log(this.changePasswordForm);
    console.log(this.changePasswordForm.get("password"));
    this._updateUserSettings(this._userId, {
      ...this.userUpdateObj,
      password: this.changePasswordForm.get("password")?.value,
    });
  }
  private _updateUserSettings(id: string, body: IUpdateUser) {
    this.userService.updateUserSettings(id, body).subscribe((data: IUpdateUserResponse | null) => {
      console.log(data);
    });
  }
  onGoTo(value: string) {
    console.log(value);
  }
}
