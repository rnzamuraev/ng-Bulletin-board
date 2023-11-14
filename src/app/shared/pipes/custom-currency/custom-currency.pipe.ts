import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customCurrency",
  standalone: true,
})
export class CustomCurrencyPipe implements PipeTransform {
  matrix = "___ ___ ___ ___ ___";

  transform(value: number, arg: string = ""): unknown {
    return this._createMask(value.toString(), arg);
  }
  private _createMask(elem: string, arg: string): string {
    let i = 0;
    this.matrix = this._getMatrix(elem);
    return (elem =
      this.matrix.replace(/./g, a => {
        return /[_\d]/.test(a) && i < elem.length ? elem.charAt(i++) : i >= elem.length ? "" : a;
      }) + `${arg}`);
  }
  private _getMatrix(elem: string): string {
    const num = elem.split(".")[0];
    let counter = 0;
    for (let i = 1; i <= num.length; i++) {
      counter++;
      if ((i + 1) % 4 === 0) {
        counter++;
      }
    }
    return this.matrix.slice(-counter).trim();
  }
}
