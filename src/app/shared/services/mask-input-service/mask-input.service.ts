import { ElementRef, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MaskInputService {
  constructor() {}

  //** Маска для телефона с кастомными разделителями можно задать нужный тип вызове метода */
  maskPhone(e: Event, input: ElementRef<HTMLInputElement>, delimiter: string = " "): void {
    if (delimiter == "-" || delimiter == " " || delimiter == "") {
      this._createMask(e, input, delimiter);
    }
  }
  //** Создаем маску для телефона */
  private _createMask(e: Event, input: ElementRef<HTMLInputElement>, delimiter: string): void {
    const matrix = `+7 (___) ___${delimiter}__${delimiter}__`;
    let def = matrix.replace(/\D/g, ""); // 7
    let val = input.nativeElement.value.replace(/\D/g, "");
    if (def.length >= val.length) {
      val = def;
    }
    console.log(val);
    input.nativeElement.value = this._getMask(val, matrix);
    this._setInputValueByEventType(e, input.nativeElement, def);
  }
  //** Задаем разное значение для инпута в зависимости от типа события 'Focus Input Blur' */
  private _setInputValueByEventType(e: Event, input: HTMLInputElement, def: string) {
    if (e.type === "focus") {
      this._setCursorPosition(input.value.length, input);
      return;
    }
    if (e.type === "input" && input.value[1] !== def) {
      input.value = `+7 (${input.value[1]}${input.value.slice(5)}`;
      return;
    }
    if (e.type === "blur") {
      if (input.value.length <= 2) {
        input.value = "";
      }
    }
  }
  //** Устанавливаем позицию курсора мыши когда инпут в фокусе */
  private _setCursorPosition(pos: number, elem: HTMLInputElement): void {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    }
  }
  //**Установить маску телефона в статических элементах, можно было переписать в пайп, но потребовалась так-же в инпуте */
  setMaskPhone(val: string): string {
    const matrix = `+7 (___) ___-__-__`;
    let phone = val.replace(/\D/g, "");
    if (val[0] === "8") {
      phone = `7${phone.slice(1)}`;
    }
    return this._getMask(phone, matrix);
  }
  //** Маска стоимости для инпута и не только */
  costMask(input: ElementRef<HTMLInputElement>) {
    let matrix = "___ ___ ___";
    let val = input.nativeElement.value.replace(/\D/g, "");
    matrix = this._getMatrixCost(input, matrix);
    let i = 0;
    input.nativeElement.value = this._getMask(val, matrix);
  }
  //** Получаем матрицу для маски стоимости */
  private _getMatrixCost(input: ElementRef<HTMLInputElement>, matrix: string) {
    const arr = input.nativeElement.value.split(".");
    const num = arr[0].replace(/\D/g, "");
    let counter = 0;
    for (let i = 1; i <= num.length; i++) {
      counter++;
      if ((i + 1) % 4 === 0) {
        counter++;
      }
    }
    return matrix.slice(-counter).trim();
  }
  //** Функция поиска и замены совпадений с матрицей одна для всех*/
  private _getMask(value: string, matrix: string): string {
    let i = 0;
    return matrix.replace(/./g, a => {
      return /[_\d]/.test(a) && i < value.length ? value.charAt(i++) : i >= value.length ? "" : a;
    });
  }
}
