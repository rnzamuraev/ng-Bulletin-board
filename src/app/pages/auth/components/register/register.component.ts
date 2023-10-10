import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/pages/auth/services/auth-service/auth.service";
import { LocalStorageService } from "src/app/shared/services/local-storage-service/local-storage.service";
import { UserService } from "src/app/shared/services/user-service/user.service";
import { IAuthRegister } from "src/app/shared/types/auth.interface";
import { IErrorMessage } from "src/app/shared/types/error.interface";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  // public register = EStaticVar.REGISTER;
  // public formHeader!: string;
  // public formBtnText!: string;
  public unacceptableSymbols = "\"№;|^:?*)(_-}{+='><,`.~][/\\";
  public isInputType = true;
  public isSubmitted = false;
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
    private localStorage: LocalStorageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this._initializeForm();
  }

  private _initializeForm(): void {
    this.form = new FormGroup({
      login: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[0-9]{11}$/i),
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
        Validators.pattern(/^[a-zа-яё][a-zа-яё]+[ _]?[A-ZА-ЯЁ]*$/i),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24),
        Validators.pattern(/^(?=.*[\d])(?=.*[A-ZА-ЯЁ])[^+},"=\]>.№{|?`^*;'~[/<):\\_(-]{8,}$/),
      ]),
    });
  }

  public onSetIsLogin(value: boolean): void {
    this.toggleIsLogin.emit(value);
    // this.authService.setIsLogin(value);
  }

  public onChangeInputType(): void {
    this.isInputType = !this.isInputType;
  }

  public onSubmitRegister() {
    if (this.form.invalid) {
      return;
    }

    this._addNewUser(this.form.value);
  }
  private _addNewUser(user: IAuthRegister) {
    // const newUser = { id: 0, ...data, phone: "", avatar: "" };
    this.authService.addUser(user).subscribe((data: string | HttpErrorResponse) => {
      if (typeof data === "string") {
        this.getCurrentUserBy.emit(data);

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
  private _goTo() {
    this.router.navigateByUrl("/lk/my-items");
  }
  private _resetForm() {
    this.form.reset();
  }
  onClose() {
    this.toggleIsLogin.emit(true);
    this.authService.close();
  }

  // private _isEmail(email: string) {
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
  private _isUser(form: IAuthRegister) {
    // return this.authService.isUser(form.email, form.password).subscribe(data => {
    //   if (data === false) {
    //     this.formErrorMessage = "Почта или пароль указаны неверно";
    //   } else if (data !== true) {
    //     this.stateService.setUser$(data);
    //     this.formErrorMessage = "";
    //     this.onGoTo("");
    //   }
    // });
  }
  public getTextInvalidFormPass() {
    console.log(this.form.errors);
    let message!: string;

    if (this.form.value.password) {
      if (this.form.value.password.length < 8) {
        message = "Должно быть не менее 8 символов";
      } else if (this.form.value.password.length > 24 || this.form.value.name.length > 24) {
        message = "Должно быть не более 24 символов";
      } else if (this._validCharactersFilter()) {
        message = `Не допустимые символы: ${this.unacceptableSymbols}`;
      } else {
        message = "Пароль должен содержать как минимум 1 заглавную букву и 1 цифру.";
      }
    }

    if (this.form.value.name) {
    }

    if (this.form.value.login) {
      if (this.form.value.name.length < 4) {
        message = "Должно быть не менее 4 символов";
      } else if (this.form.value.login.length !== 11) {
        message = "Должно быть 11 цифр";
      }
    }
    return message;
  }

  private _validCharactersFilter() {
    let isValid = false;
    for (let j = 0; j < this.unacceptableSymbols.length; j++) {
      for (let i = 0; i < this.form.value.password.length; i++) {
        if (this.form.value.password[i] === this.unacceptableSymbols[j]) isValid = true;
      }
    }
    return isValid;
  }
}
