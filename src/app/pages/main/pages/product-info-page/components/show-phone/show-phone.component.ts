import { Component, Input, OnInit } from "@angular/core";
import { MaskInputService } from "src/app/shared/services/mask-input-service/mask-input.service";
import { OpenService } from "src/app/shared/services/open-service/open.service";

@Component({
  selector: "app-show-phone",
  templateUrl: "./show-phone.component.html",
  styleUrls: ["./show-phone.component.scss"],
})
export class ShowPhoneComponent implements OnInit {
  isOpen!: boolean;
  phoneProps!: string;
  linkTel!: string;

  @Input()
  userNameProps!: string;
  @Input("phoneProps")
  set SetPhone(props: string) {
    this._setMaskPhone(props);
    this._setLinkTel(props);
  }

  constructor(private openService: OpenService, private maskService: MaskInputService) {}
  ngOnInit(): void {
    // this._initializeSetPhone(this.phoneProps);
    this._initializeShowModal();
  }
  //** Установить ссылку телефона для звонка */
  private _setLinkTel(value: string) {
    if (value[0] === "8") {
      this.linkTel = `tel:${value}`; //tel:+78142332211
      return;
    }
    this.linkTel = `tel:+${value}`; //tel:+78142332211
  }
  //** Установить маску телефона */
  private _setMaskPhone(value: string): void {
    this.phoneProps = this.maskService.setMaskPhone(value);
  }
  // ** Подписываемся на изменения статуса Показать/Закрыть номер телефона */
  private _initializeShowModal(): void {
    this.openService.showPhone.subscribe((isData: boolean) => {
      this.isOpen = isData;
    });
  }
  //** Закрыть модальное окно показать телефон */
  onClosePhone(): void {
    this.openService.closePhone();
  }
}
