import { Component, OnInit } from "@angular/core";
import { EStaticVar } from "../shared/types/staticVar.enum";
import { ITextProps } from "./types/auth.interface";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  public isLogin = true;
  public formText!: ITextProps;

  ngOnInit(): void {
    this.setTextForm();
  }

  public setTextForm(): void {
    if (this.isLogin) {
      this.formText = {
        header: EStaticVar.LOGIN,
        btnText: "Вход",
      };
      return;
    }

    this.formText = {
      header: EStaticVar.REGISTER,
      btnText: "Зарегистрироваться",
    };
  }

  public setIsLoginProps(data: boolean): void {
    this.isLogin = data;
    this.setTextForm();
  }
}
