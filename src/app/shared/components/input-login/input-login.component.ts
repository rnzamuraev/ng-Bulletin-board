import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { FormService } from "../../services/form-service/form.service";
import { MaskInputService } from "../../services/mask-input-service/mask-input.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-input-login",
  templateUrl: "./input-login.component.html",
  styleUrls: ["./input-login.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class InputLoginComponent implements AfterViewInit, OnDestroy {
  private unsubscribeIsSavePhone!: Subscription;

  isBlur = false;

  @Output()
  loginInput = new EventEmitter<ElementRef<HTMLInputElement>>();
  @Output()
  phoneNumber = new EventEmitter<string>();
  @Output()
  isSavePhone = new EventEmitter<boolean>();

  @Input()
  phoneProps!: string;
  @Input()
  controlsProps!: AbstractControl;
  @Input()
  errorMessageProps!: string;

  @ViewChild("login")
  login!: ElementRef<HTMLInputElement>;

  constructor(private maskService: MaskInputService, private formService: FormService) {}

  ngAfterViewInit(): void {
    this._setNumberPhone();
    this._passElemRef();
    this._initializeIsSavaPhone();
  }
  //** подписка на состояние сохранять телефон или нет */
  private _initializeIsSavaPhone() {
    this.unsubscribeIsSavePhone = this.formService.getIsSavePhone$.subscribe((isData: boolean) => {
      if (isData) {
        this._savePhone();
        this.formService.setIsSavePhone(false);
      }
    });
  }
  //** Записать номер телефона в инпут если телефон был передан от родителя */
  private _setNumberPhone(): void {
    if (this.phoneProps) this.login.nativeElement.value = this.phoneProps;
  }
  //** Передаем 'ElementRef' в родительский компонент */
  private _passElemRef() {
    this.loginInput.emit(this.login);
  }
  //** Обработчик событий ('Input, Focus, Blur') */
  onInputMask(e: Event) {
    this._setMaskPhone(e);
    this._setIsBlur(e);
    this._passNumberPhone();
  }
  //** Установить маску телефона */
  private _setMaskPhone(e: Event) {
    this.maskService.maskPhone(e, this.login, "-");
  }
  //** Изменить состояние 'isBlur' при изменении значения в 'Input' */
  private _setIsBlur(e: Event) {
    if (e.type === "blur" && this.login.nativeElement.value.length > 2) this.isBlur = true;
  }
  //** Передаем номер телефона в родительский компонент */
  private _passNumberPhone() {
    this.phoneNumber.emit(this.formService.getNumberPhone(this.login.nativeElement.value));
  }
  private _savePhone() {
    this.formService.savePhone(this.login.nativeElement.value);
  }
  //** Отписываемся от кастомных подписок */
  ngOnDestroy(): void {
    this.unsubscribeIsSavePhone.unsubscribe();
  }
}
