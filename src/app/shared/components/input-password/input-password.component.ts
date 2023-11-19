import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { FormService } from "../../services/form-service/form.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-input-password",
  templateUrl: "./input-password.component.html",
  styleUrls: ["./input-password.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class InputPasswordComponent implements AfterViewInit {
  // unacceptableSymbols = "\"№;|^:?*)(_-}{+='><,`.~][/\\";
  isInputType = true;
  isBlur = false;

  @Output()
  passwordInput = new EventEmitter<ElementRef<HTMLInputElement>>();
  @Output()
  password = new EventEmitter<string>();

  @Input()
  controlsProps!: AbstractControl;
  @Input()
  errorMessageProps!: string;
  @Input()
  placeholderProps!: string;

  @ViewChild("pass")
  pass!: ElementRef<HTMLInputElement>;

  constructor(private formService: FormService) {}

  ngAfterViewInit(): void {
    // this._setNumberPhone();
    this._passElemRef();
  }
  // //** Записать номер телефона в инпут если телефон был передан от родителя */
  // private _setNumberPhone(): void {
  //   if (this.phoneProps) this.login.nativeElement.value = this.phoneProps;
  // }
  //** Передаем 'ElementRef' в родительский компонент */
  private _passElemRef() {
    this.passwordInput.emit(this.pass);
  }
  //** Изменяем значение 'input=type' показать\скрыть пароль */
  onChangeInputType(): void {
    this.isInputType = !this.isInputType;
  }
  //** Обработчик событий ('Input, Focus, Blur') */
  onInputPass(e: Event) {
    console.log("errorMessageProps: ", this.errorMessageProps);
    // this._setMaskPhone(e);
    this._setIsBlur(e);
    this._passPassword();
  }
  // //** Установить маску телефона */
  // private _setMaskPhone(e: Event) {
  //   this.maskService.maskPhone(e, this.pass, "-");
  // }
  //** Изменить состояние 'isBlur' при изменении значения в 'Input' */
  private _setIsBlur(e: Event) {
    console.log(e);
    console.log("isBlur: ", this.isBlur);

    if (e.type === "blur" && this.pass.nativeElement.value.length > 0) this.isBlur = true;
  }
  //** Передаем пароль в родительский компонент */
  private _passPassword(): void {
    console.log(this.pass.nativeElement.value);
    this.password.emit(this.pass.nativeElement.value);
  }
}
