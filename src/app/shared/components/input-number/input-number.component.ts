import { CommonModule } from "@angular/common";
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
import { MaskInputService } from "../../services/mask-input-service/mask-input.service";

@Component({
  selector: "app-input-number",
  templateUrl: "./input-number.component.html",
  styleUrls: ["./input-number.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class InputNumberComponent implements AfterViewInit {
  @Output()
  costInput = new EventEmitter<ElementRef<HTMLInputElement>>();
  @Output()
  cost = new EventEmitter<string>();

  @Input("costProps")
  set isClearInput(props: string) {
    if (props) this.inputCost.nativeElement.value = "";
  }

  @Input()
  costValueProps!: string;
  @Input()
  placeholderProps!: string;
  @Input()
  controlsProps!: AbstractControl;
  @Input()
  errorMessageProps!: string;

  @ViewChild("cost")
  inputCost!: ElementRef<HTMLInputElement>;

  constructor(private maskService: MaskInputService, private formService: FormService) {}

  ngAfterViewInit(): void {
    this._passInputCost();
    this._initialCost();
    this.onInputMask();
  }
  //** Записать величины стоимости в инпут если она была передана от родителя */
  private _initialCost(): void {
    console.log(this.controlsProps);
    console.log(this.costValueProps);
    console.log(this.inputCost);
    if (this.controlsProps) this.inputCost.nativeElement.value = this.controlsProps.value;
    else this.inputCost.nativeElement.value = this.costValueProps;
  }
  //** Обработчик событий ('Input, Focus, Blur') */
  onInputMask() {
    this._setCostMask();
    this._passCost();
  }
  //** Установить маску стоимости */
  private _setCostMask() {
    console.log(this.inputCost);
    this.maskService.costMask(this.inputCost);
  }
  //** Передаем  в родительский компонент */
  private _passCost() {
    this.cost.emit(this.inputCost.nativeElement.value.replace(/\D/g, ""));
  }
  //** Передаем  в родительский компонент */
  private _passInputCost() {
    this.costInput.emit(this.inputCost);
  }
}
