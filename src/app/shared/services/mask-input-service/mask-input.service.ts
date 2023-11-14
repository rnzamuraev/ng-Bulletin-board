import { ElementRef, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MaskInputService {
  constructor() {}

  maskPhone(e: Event, input: ElementRef<HTMLInputElement>, delimiter: string = " "): void {
    if (delimiter == "-" || delimiter == " " || delimiter == "") {
      this._createMask(e, input, delimiter);
    }
  }
  private _createMask(e: Event, input: ElementRef<HTMLInputElement>, delimiter: string): void {
    const matrix = `+7 (___) ___${delimiter}__${delimiter}__`;

    let def = matrix.replace(/\D/g, ""); // 7
    let val = input.nativeElement.value.replace(/\D/g, "");
    // let i = 0;

    if (def.length >= val.length) {
      val = def;
    }

    console.log(val);
    input.nativeElement.value = this._getMask(val, matrix);
    //   matrix.replace(/./g, function (a) {
    //   return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    // });

    this._setInputValueByEventType(e, input.nativeElement, def);
  }
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
      // this._thisLength(input.nativeElement);
      if (input.value.length <= 2) {
        input.value = "";
      }
    }
  }
  // private _thisLength(elem: HTMLInputElement): void {
  //   let num = elem.value.replace(/\D/g, "").length;
  //   elem.setAttribute("data-num", `${num}`);
  // }
  private _setCursorPosition(pos: number, elem: HTMLInputElement): void {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    }
  }
  setMaskPhone(val: string): string {
    const matrix = `+7 (___) ___-__-__`;
    let phone = val.replace(/\D/g, "");
    if (val[0] === "8") {
      phone = `7${phone.slice(1)}`;
    }
    return this._getMask(phone, matrix);
  }

  costMask(input: ElementRef<HTMLInputElement>) {
    let matrix = "___ ___ ___";
    let val = input.nativeElement.value.replace(/\D/g, "");
    matrix = this._getMatrixCost(input, matrix);
    // input.nativeElement.value = this._getMask(val, matrix);
    let i = 0;
    input.nativeElement.value = matrix.replace(/./g, a => {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
  }
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
  private _getMask(value: string, matrix: string): string {
    let i = 0;
    return matrix.replace(/./g, a => {
      return /[_\d]/.test(a) && i < value.length ? value.charAt(i++) : i >= value.length ? "" : a;
    });
  }
}
