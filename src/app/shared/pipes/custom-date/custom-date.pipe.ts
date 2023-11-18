import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDate",
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string, ..._args: unknown[]): string {
    let dateItems = `${new Date(Date.parse(value))}`.split(" ");
    return this._createDate(dateItems);
  }
  private _createDate(data: string[]): string {
    const [, month, num, year, time] = data;
    let str = "";
    switch (month) {
      case "Dec":
        str = "декабря";
        break;
      case "January":
        str = "января";
        break;
      case "February":
        str = "февраля";
        break;
      case "March":
        str = "марта";
        break;
      case "April":
        str = "апреля";
        break;
      case "May":
        str = "мая";
        break;
      case "June":
        str = "июня";
        break;
      case "July":
        str = "июля";
        break;
      case "August":
        str = "августа";
        break;
      case "September":
        str = "сентября";
        break;
      case "Oct":
        str = "октября";
        break;
      case "Nov":
        str = "ноября";
        break;
    }
    return `${num.replace("0", "")} ${str} ${time.slice(0, -3)} ${+year > 2023 ? ` ,${year}` : ""}`;
  }
}
