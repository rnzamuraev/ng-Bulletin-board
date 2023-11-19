import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { DadataAddress, DadataConfig, DadataSuggestion, DadataType } from "@kolkov/ngx-dadata";

import { DadataService } from "src/app/pages/lk/services/dadata-service/dadata.service";
import { ISettingsForm, ISettingsFormSubmit } from "src/app/pages/lk/types/advert-form.interface";
import { INewUser } from "src/app/pages/lk/types/user.interface";
import { ErrorMessageService } from "src/app/shared/services/error-message-service/error-message.service";
import { FormService } from "src/app/shared/services/form-service/form.service";

@Component({
  selector: "app-settings-form",
  templateUrl: "./settings-form.component.html",
  styleUrls: ["./settings-form.component.scss"],
})
export class SettingsFormComponent implements OnInit {
  private _formData!: FormData;
  private _termAddress!: string;

  isSavePhone = false;
  newCurrentUserProps!: INewUser;
  form!: FormGroup;
  errorMessageName!: string;
  errorMessageLogin!: string;
  errorMessageLocation!: string;
  loginInput!: ElementRef<HTMLInputElement>;
  // errorMessageProps!: string | null;
  // config: DadataConfig = {
  //   apiKey: "04567171dbc9059492ec016b1b751a3682148741",
  //   type: DadataType.address,
  // };

  @Output()
  paramsUser = new EventEmitter<ISettingsFormSubmit>();
  @Output()
  isSubmitting = new EventEmitter<boolean>();

  @Input()
  isSubmittingProps!: boolean;
  @Input("newCurrentUserProps")
  set getNewUser(props: INewUser | null) {
    if (props) {
      console.log(props);
      this.newCurrentUserProps = props;
      this._createForm();
      this._initializeValidationForm();
    }
  }

  constructor(
    private errorMessageService: ErrorMessageService,
    private formService: FormService,
    private dadataService: DadataService
  ) {}

  ngOnInit(): void {
    // this._initializeValidationSettingsForm();
  }

  //**? При загрузке страницы */
  //** Создаем форму настроек */
  private _createForm() {
    this.form = new FormGroup({
      name: new FormControl(this.newCurrentUserProps.name, [
        Validators.minLength(4),
        Validators.maxLength(24),
        Validators.pattern(/^[a-zа-яё][A-ZА-ЯЁ]*$/i),
      ]),
      login: new FormControl(this.formService.getNumberPhone(this.newCurrentUserProps.phone), [
        // login: new FormControl(this.newCurrentUserProps.phone, [
        this.formService.setValidatorsLogin(),
      ]),
      location: new FormControl(this.newCurrentUserProps.address, [Validators.maxLength(255)]),
    });
    console.log(this.form);
  }
  //** Подписываемся на изменения значений в форме */
  private _initializeValidationForm() {
    this.form.valueChanges.subscribe((data: ISettingsForm) => {
      console.log(this.form.controls["login"].errors);
      if (data.name) {
        this.errorMessageName = this._getErrorMessage("name");
      }
      if (data.location) {
        this.errorMessageLocation = this._getErrorMessage("location");
      }
    });
  }
  //** Получаем 'HTMLInputElement' из дочернего компонента */
  onGetLoginInputProps(props: ElementRef<HTMLInputElement>) {
    this.loginInput = props;
  }
  //** Получаем номер телефона из дочернего компонента */
  onGetPhoneNumberProps(props: string) {
    this._patchFormLogin(props);
    this.errorMessageLogin = this._getErrorMessage("login");
  }
  onIsSavePhoneProps(props: boolean) {
    this.isSavePhone = props;
  }
  private _getErrorMessage(val: string): string {
    return this.errorMessageService.validationControl(this.form.controls[val], val);
  }
  //** Записываем номер телефона в форму */
  private _patchFormLogin(value: string) {
    this.form.patchValue({ login: value }, { emitEvent: false });
  }
  //**************************************************** DaData Start */
  // fetchAddress(termAddress: string) {
  //   this.dadataService.fetchAddress(termAddress).subscribe(data => {
  //     this.newCurrentUserProps.address = data;
  //   });
  // }
  onSearchAddress() {
    console.log(this.form.value["location"]);
    // console.log(this.form.value.location);
    // this.fetchAddress(this.form.value["location"]);
  }
  // onAddressSelected(event: DadataSuggestion) {
  //   // const e = event as unknown as DadataSuggestion;
  //   const addressData = event.data as DadataAddress;
  //   console.log(addressData);
  // }
  //**************************************************** DaData End */
  //** Проверяем форму на наличие изменений */
  isSubmitSettings(): boolean {
    if (
      this.form.controls["name"].value === this.newCurrentUserProps.name &&
      this.form.controls["login"].value ===
        this.formService.getNumberPhone(this.newCurrentUserProps.phone) &&
      this.form.controls["location"].value === this.newCurrentUserProps.address
    ) {
      return true;
    }
    return false;
  }
  // private _setErrorMessagePass(message: string) {
  //   this.errorMessage = message;
  // }
  //** Отправка формы */
  onSubmitSettingsSave() {
    if (this.form.invalid || this.isSubmittingProps || this.isSubmitSettings()) return;
    console.log(this.form);
    this._passIsSubmitting();
    this._passParamsUser();
  }
  //** Включить/Отключить кнопку во время отправки формы */
  private _passIsSubmitting() {
    this.isSubmitting.emit(true);
  }

  private _passParamsUser() {
    console.log(this._createParamsUser());
    this.paramsUser.emit(this._createParamsUser());
  }
  private _createParamsUser(): ISettingsFormSubmit {
    return {
      name: this.form.controls["name"].value,
      login: this.form.controls["login"].value,
      location: this.form.controls["location"].value,
      password: null,
      prevPassword: null,
    };
  }
}
