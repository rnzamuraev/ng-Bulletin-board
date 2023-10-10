import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/pages/auth/services/auth-service/auth.service";
import { LocalStorageService } from "src/app/shared/services/local-storage-service/local-storage.service";
import { UserService } from "src/app/shared/services/user-service/user.service";
import { IAuthLogin } from "src/app/shared/types/auth.interface";
import { IErrorMessage } from "src/app/shared/types/error.interface";
import { EStaticVar } from "src/app/shared/types/staticVar.enum";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  // public register = EStaticVar.REGISTER;
  // public formHeader!: string;
  // public formBtnText!: string;
  public isInputType = true;
  public isSubmitted = false;
  public unacceptableSymbols = "\"№;|^:?*)(_-}{+='><,`.~][/\\";
  public formErrorMessage: string[][] = [];
  public form!: FormGroup;

  @Output()
  public toggleIsLogin = new EventEmitter<boolean>();
  @Output()
  public getCurrentUserBy = new EventEmitter<string>();

  // @Input("formTextProps")
  // public set setTextProps(props: ITextProps) {
  //   this.formHeader = props.header;
  //   this.formBtnText = props.btnText;
  // }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this._initializeForm();
    // this._initializeDialogRef();
  }

  private _initializeForm(): void {
    this.form = new FormGroup({
      login: new FormControl("", [
        Validators.required,
        // Validators.pattern(/^[^@\s]+@[^@\s][\w]+\.[a-z]{2,}$/i),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[\d])(?=.*[A-ZА-ЯЁ])[^+},"=\]>.№{|?`^*;'~[/<):\\_(-]{6,}$/),
      ]),
    });
  }

  public onSetIsLogin(value: boolean): void {
    this.toggleIsLogin.emit(value);
  }

  public onChangeInputType(): void {
    this.isInputType = !this.isInputType;
  }

  // private addNewUser(data: IRegisterRequest) {
  //   const newUser = { id: 0, ...data, phone: "", avatar: "", posts: [] };
  //   this.dataService.addUser(newUser).subscribe(user => {
  //     this.stateService.setUser$(user);
  //   });
  // }

  public onSubmitLogin() {
    if (this.form.invalid) {
      return;
    }

    this._userLogIn(this.form.value);
  }
  private _userLogIn(user: IAuthLogin) {
    this.authService.userLogin(user).subscribe((data: string | HttpErrorResponse) => {
      if (typeof data === "string") {
        this.localStorage.set(EStaticVar.USER_TOKEN_KEY, data);
        this.getCurrentUserBy.emit("token");

        this.formErrorMessage = [];
        this._resetForm();
        this.onClose();
        this._goTo();
        return;
      }
      this._setErrorMessage(data.error);
    });
  }
  private _setErrorMessage(error: IErrorMessage) {
    this.formErrorMessage = [];
    if (error.login) {
      this.formErrorMessage.push(error.login);
    }
    if (error.name) {
      this.formErrorMessage.push(error.name);
    }
    if (error.password) {
      this.formErrorMessage.push(error.password);
    }
  }
  private _resetForm() {
    this.form.reset();
  }
  private _goTo() {
    this.router.navigateByUrl("/lk/my-items");
  }
  onClose() {
    this.authService.close();
  }

  // private isEmail(email: string) {
  //   return this.dataService.isUser(email).subscribe(data => {
  //     if (data === true) {
  //       this.formErrorMessage = "Такой пользователь уже существует, введите другую почту";
  //     } else {
  //       this.addNewUser(this.form.value);
  //       this.formErrorMessage = "";
  //       this.onGoTo("");
  //     }
  //   });
  // }
  // private isUser(form: ILoginRequest) {
  //   return this.dataService.isUser(form.email, form.password).subscribe(data => {
  //     if (data === false) {
  //       this.formErrorMessage = "Почта или пароль указаны неверно";
  //     } else if (data !== true) {
  //       this.stateService.setUser$(data);
  //       this.formErrorMessage = "";
  //       this.onGoTo("");
  //     }
  //   });
  // }
  public getTextInvalidFormPass() {
    let message!: string;
    if (this.form.value.password.length <= 6) {
      message = "Должно быть не менее 7 символов";
    } else if (this.form.value.password.length > 20) {
      message = "Должно быть не более 20 символов";
    } else if (this.validCharactersFilter()) {
      message = `Не допустимые символы: ${this.unacceptableSymbols}`;
    } else {
      message = "Пароль должен содержать как минимум 1 заглавную букву и 1 цифру.";
    }
    return message;
  }

  private validCharactersFilter() {
    let isValid = false;
    for (let j = 0; j < this.unacceptableSymbols.length; j++) {
      for (let i = 0; i < this.form.value.password.length; i++) {
        if (this.form.value.password[i] === this.unacceptableSymbols[j]) isValid = true;
      }
    }
    return isValid;
  }
}
