import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { BASE_URL } from "src/app/config.API";
import { AdvertService } from "src/app/shared/services/adverts-service/advert.service";
import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { ErrorMessageService } from "src/app/shared/services/error-message-service/error-message.service";
import { FormService } from "src/app/shared/services/form-service/form.service";
import { ImageService } from "src/app/shared/services/image-service/image.service";
import { UserService } from "src/app/shared/services/user-service/user.service";
import { ICategory } from "src/app/shared/types/category.interface";
import { IUser } from "src/app/shared/types/user.interface";
import { IAdvertById, IAdvertUser, IImageObj } from "../../../../shared/types/adverts.interface";
import { IAdvertForm, IPartialAdvert } from "../../types/advert-form.interface";

// type TImage = string | ArrayBuffer | null;
type TControl = string | number | null | undefined;

@Component({
  selector: "app-new-item-page",
  templateUrl: "./new-item-page.component.html",
  styleUrls: ["./new-item-page.component.scss"],
})
export class NewItemPageComponent implements OnInit, OnDestroy {
  private _unGetCurrentUser!: Subscription;
  // private _unGetIsEdit!: Subscription;
  private _unGetAdvert!: Subscription;
  private _address!: string;
  private _currentUser!: IUser;
  private _advert!: IAdvertById;

  isAddAdvert!: boolean;
  isResetDropdown = false;
  isEdit!: boolean;
  categories!: ICategory[];
  selectedCategory: ICategory | null = null;
  arrayImage: IImageObj[] = [];
  imageObj!: IImageObj;
  imagesLinkBg!: string[];
  advertForm!: FormGroup<IAdvertForm>;
  errors!: string[];
  errorMessageName!: string;
  errorMessageDescr!: string;
  errorMessageLoc!: string;
  errorMessageCost!: string;
  cost = "";

  // resetDropdown!: () => void;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private advertService: AdvertService,
    private formService: FormService,
    private imageService: ImageService,
    private errorMessageService: ErrorMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this._initialGetIsEdit();
    // this._initialGetAdvert();
    this._fetchCategoryById(0);
    this._initialAddress();
    this._initialGetCurrentUser();
    this._initialForm();
    this._initialFormValueChange();
    this._initialFormChange();
  }

  //**? При загрузке страницы */
  // //** Получаем состояние страницы Редактирование или Добавление */
  // private _initialGetIsEdit() {
  //   this._unGetIsEdit = this.advertService.getIsEdit$.subscribe((isData: boolean) => {
  //     // this._resetForm();
  //     this._initialForm(this._advert);
  //     this._initialFormValueChange();
  //     this._initialFormChange();
  //     this.isEdit = isData;
  //   });
  // }
  //** получаем объявление по 'ID' */
  // private _initialGetAdvert(): void {
  //   this._unGetAdvert = this.advertService.getAdvert$.subscribe((data: IAdvertById | null) => {
  //     if (data) {
  //       this._advert = data;
  //       this._getImagesLink(data.imagesIds);
  //     }
  //     console.log(data);
  //   });
  // }
  // //** Получаем массив ссылок для отображения картинок */
  // private _getImagesLink(imagesIds: string[]): void {
  //   this.imagesLinkBg = [];
  //   imagesIds.map((elem: string) => {
  //     this._createImageObj();
  //     this.imageObj.url = `${BASE_URL}/images/${elem}`;
  //     this.imageObj.imageId = elem;
  //     this.arrayImage.push(this.imageObj);
  //     return `${BASE_URL}/images/${elem}`;
  //   });
  //   // this._setBgImg(0);
  //   console.log(this.imagesLinkBg);
  // }
  //********************************************************************** */
  //** Получаем данные пользователя из сервиса если он вошел в аккаунт*/
  private _initialGetCurrentUser() {
    this._unGetCurrentUser = this.userService.getCurrentUser$.subscribe((data: IUser | null) => {
      if (data) {
        console.log(data.adverts);
        this._currentUser = data;
      }
    });
  }

  //** Получаем адрес пользователя если он сохранял его*/
  private _initialAddress() {
    const address = this.formService.getLocation;
    if (typeof address === "string") {
      this._address = address;
    }
  }
  //** Активируем форму */
  private _initialForm() {
    this.advertForm = new FormGroup<IAdvertForm>({
      categoryId: new FormArray([
        new FormGroup({
          category: new FormControl("", [Validators.required]),
        }),
      ]),
      name: new FormControl("", [Validators.minLength(4), Validators.maxLength(255)]),
      description: new FormControl("", [Validators.maxLength(255)]),
      location: new FormControl(this._address, [Validators.required, Validators.maxLength(255)]),
      images: new FormControl([]),
      cost: new FormControl(null, [Validators.minLength(1), Validators.maxLength(9)]),
    });
  }
  private _initialFormValueChange() {
    this.advertForm.valueChanges.subscribe((data: Partial<IPartialAdvert>) => {
      this.errorMessageName = this._setErrorMessage(data["name"], this.advertForm, "name");
      this.errorMessageDescr = this._setErrorMessage(
        data["description"],
        this.advertForm,
        "description"
      );
      this.errorMessageLoc = this._setErrorMessage(data["location"], this.advertForm, "location");
    });
  }
  private _setErrorMessage(data: TControl, form: FormGroup, controlName: string) {
    let errorMessageDescr!: string;
    if (data) {
      errorMessageDescr = this.errorMessageService.validationControl(
        // data.description,
        form.controls[`${controlName}`],
        // this.advertForm
        controlName
      );
    }
    return errorMessageDescr;
  }
  private _initialFormChange() {
    this.advertForm.valueChanges.subscribe(data => {
      console.log(data);
      console.log(data.description?.length);
      if (data.description) {
        const description = this.advertForm.controls["description"];
        if (description.invalid && description.touched && description.value?.length) {
          console.log(this.advertForm.controls["description"].errors);
        }
      }
      console.log(this.advertForm.errors);
      // "advertForm.controls['name'].invalid && advertForm.controls['name'].touched && advertForm.get('name')?.value"
    });
  }
  //** Получаем с сервера список категорий при загрузке страницы и при изменениях ID когда он передан*/
  private _fetchCategoryById(index: number) {
    let id = "";
    // console.log(this.selectedCategory);
    if (this.selectedCategory) id = this.selectedCategory.id;

    console.log(id);
    this.categoryService.fetchCategoryChildByParentId(id).subscribe((data: ICategory[]) => {
      console.log(data);
      this.categories = data;
      console.log(data);
      // this.newCategories = data;
      // if (this._isEdit && index < this._categoriesForFormCategory.length - 1)
      if (data.length <= 0) return;

      //** Добавляем новое поле категорий если была выбрана текущая категория*/
      if (this.selectedCategory) this._addNewCategoryField(index);
      // this.editActiveCategory = this.categoriesForFormCategory[index];
    });
  }

  //**? После загрузке страницы */
  //** Добавляем новое поле категорий по индексу*/
  private _addNewCategoryField(index: number): void {
    //** Удаляем поля категорий если предыдущее было изменено */
    // this._deleteCategoryField(index, this.advertForm.controls["categoryId"]);
    this._deleteCategoryField(index);

    (this.advertForm.controls["categoryId"] as FormArray).push(
      new FormGroup({
        category: new FormControl("", [Validators.required]),
      })
    );
  }
  //** Удаляем поля категорий если предыдущее было изменено или очищено */
  private _deleteCategoryField(
    index: number
    // categories: FormArray<FormGroup<IAdvertFormCategory>>
  ) {
    console.log(this.advertForm.controls["categoryId"].length);
    console.log(index);
    for (let i = this.advertForm.controls["categoryId"].length - 1; i > index; i--) {
      console.log(i);
      (this.advertForm.controls["categoryId"] as FormArray).removeAt(i);
    }
  }
  //** Устанавливаем динамическое добавление категорий */
  getCategory(): AbstractControl[] {
    return (this.advertForm.controls["categoryId"] as FormArray).controls;
  }
  //** Получаем категорию из дочернего компонента выбранную пользователем или NULL при очистке поля */
  onSelectedCategoryProps(props: ICategory | null, index: number) {
    console.log(props);
    this.selectedCategory = props;
    //** Заносим изменения в контроллер формы */
    this._patchValue(index, props);

    console.log(this.advertForm.value);
    console.log(this.selectedCategory);
    // this.addNewCategoryField(category, index);
    if (props) {
      //** Получаем список категорий по ID если он передан */
      this._fetchCategoryById(index);
    } else {
      //**  Удаляем поля категорий если предыдущее очищено*/
      this._deleteCategoryField(index);
      // this._deleteCategoryField(index, this.advertForm.controls["categoryId"]);
    }
    // const a = this.advertForm.controls["name"]
    // a.
  }
  // ** Заносим изменения в контроллер формы при изменении текущего или добавлении нового */
  private _patchValue(index: number, category: null | ICategory) {
    let value!: string | null;
    if (category) value = category.id;
    else value = category;
    this.advertForm.controls["categoryId"].controls[`${index}`].patchValue(
      { category: value },
      { emitEvent: false }
    );
  }
  // ** Создаем новый объект фото или очищаем текущий */
  private _createImageObj() {
    this.imageObj = {
      name: "",
      url: "",
      size: "",
      file: null,
      imageId: "",
    };
  }
  // ** Устанавливаем размер изображения в Кб/Мб */
  private _setImageSize(size: number) {
    let val = `${Math.round(size / 1000)}`;
    if (val.length > 3) {
      val = `${(+val / 1000).toFixed(2)}`.replace(".", ",") + " Мб";
    } else val = `${val} Кб`;
    console.log(val);
    return val;
  }
  // ** Загружаем одну или несколько картинок */
  onLoadImage(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      // console.log(target.files);
      for (let key in target.files) {
        const file = target.files[key];
        // console.log(file);
        let reader = new FileReader();
        // const readAsDataUrl = reader.readAsDataURL as readAsDataURL;
        reader.readAsDataURL(file);
        //** Устанавливаем параметры картинки */
        this._setImageParams(reader, file);
        //** Отлавливаем возможные ошибки при загрузке картинок */
        this._setImageError(reader);
      }
    }
  }
  //** Устанавливаем параметры картинки */
  private _setImageParams(reader: FileReader, file: File) {
    // this.file = file;
    reader.onload = () => {
      // console.log(file);
      // console.log(reader.result);
      this._createImageObj();
      this.imageObj.name = file.name;
      this.imageObj.size = this._setImageSize(file.size);
      this.imageObj.url = reader.result;
      this.imageObj.file = file;
      console.log(this.imageObj);
      if (this.arrayImage.length < 10) {
        this.arrayImage.unshift(this.imageObj);
      }
    };
  }
  //** Отлавливаем возможные ошибки при загрузке картинок */
  private _setImageError(reader: FileReader) {
    reader.onerror = () => {
      console.log(reader.error);
    };
  }
  //** Удаляем картинку */
  onDeleteImage(img: IImageObj) {
    this._deleteImage(img);
  }
  private _deleteImage(img: IImageObj | null) {
    if (img) this.arrayImage = this.arrayImage.filter((elem: IImageObj) => elem !== img);
    else this.arrayImage = [];
  }
  //** Получаем стоимость из дочернего компонента */
  onGetCostProps(props: string) {
    this.cost = "";
    this._patchFormCost(props);
    this.errorMessageCost = this._getErrorMessage("cost");
  }
  private _getErrorMessage(val: string): string {
    const cost = this.advertForm.get(val);
    console.log(cost);
    if (cost) return this.errorMessageService.validationControl(cost, val);
    return "";
  }
  //** Записываем номер телефона в форму */
  private _patchFormCost(value: string) {
    this.advertForm.patchValue({ cost: value }, { emitEvent: false });
  }
  //** Отправка формы добавления нового объявления */
  onSubmitAddNewAdvert() {
    console.log(this.advertForm.controls["images"].value);
    console.log(this.advertForm);
    // const a = this._createNewAdvert();
    // console.log(a);
    // if (this.isEdit) this._updateAdvert();
    // else
    this._addNewAdvert();
    console.log(this.advertForm.errors);
  }
  // private _updateAdvert() {
  //   this._deleteImageById();
  //   // this.advertService
  //   //   .updateAdvert(this._advert.id, this._createNewAdvert())
  //   //   .subscribe((data: IAdvertUser | null) => {
  //   //     console.log(data);
  //   //     this._resetForm();
  //   //     if (data) this._updateCurrentUser(data);
  //   //   });
  // }
  private _addNewAdvert() {
    this.advertService
      .addNewAdvert(this._createNewAdvert())
      .subscribe((data: IAdvertUser | null) => {
        console.log(data);
        this._resetForm();
        if (data) this._updateCurrentUser(data);
      });
  }
  // Удаляем картинки с сервера перед загрузкой новых */
  private _deleteImageById() {
    this._advert.imagesIds.forEach((elem: string) => {
      console.log(elem);
      console.log(this.arrayImage);
      if (this.arrayImage.filter((el: IImageObj) => el.imageId === elem).length > 0) return;
      else {
        console.log("delete");
        this.imageService.deleteImageById(elem);
      }
    });
  }
  private _createNewAdvert(): FormData {
    console.log(this.advertForm.controls["categoryId"].length);
    // let advert!: IAddAdvert;
    const formData = new FormData();
    if (
      this.advertForm.controls["cost"].value &&
      this.advertForm.controls["name"].value &&
      this.advertForm.controls["description"].value &&
      // this.advertForm.controls["categoryId"],
      this.advertForm.value.categoryId
    ) {
      const categoryId =
        this.advertForm.controls["categoryId"].controls[
          `${this.advertForm.controls["categoryId"].length - 1}`
        ].controls.category.value;
      // console.log(this.imgArr);

      formData.append("name", this.advertForm.controls["name"].value);
      formData.append("description", this.advertForm.controls["description"].value);
      // formData.append("images", this.file);
      formData.append("cost", `${+this.advertForm.controls["cost"].value}`);
      formData.append("email", "");
      formData.append("phone", this.formService.getNumberPhone(this._getPhoneFromStorage()));
      formData.append("location", `${this.advertForm.controls["location"].value}`);
      this.arrayImage.reverse;
      this.arrayImage.forEach((file: IImageObj) => {
        if (file.file) formData.append("images", file.file);
      });
      if (categoryId) {
        formData.append("categoryId", categoryId);
      }
    }
    console.log(formData);
    return formData;
  }
  //** Получаем телефон из 'LocalStorage' */
  private _getPhoneFromStorage(): string {
    const phone = this.formService.getPhone;
    if (phone) {
      return phone;
    }
    return "";
  }
  //** Добавить новое объявление в массив пользовательских объявлений и заносим данные пользователя в сервис */
  private _updateCurrentUser(data: IAdvertUser) {
    this.userService.setCurrentUser(this._currentUser);
    this._currentUser.adverts.unshift(data);
    this._isAddAdvert();
  }
  private _isAddAdvert() {
    this.isAddAdvert = true;
    setTimeout(() => {
      this.isAddAdvert = false;
    }, 5000);
  }
  //** Получаем данные о статусе 'ResetDropdown' из дочернего компонента */
  onIsResetDropdown(props: boolean) {
    this._setIsResetDropdown(props);
    console.log(this.isResetDropdown);
  }
  //** Переключение статуса 'ResetDropdown' */
  private _setIsResetDropdown(isValue: boolean) {
    this.isResetDropdown = isValue;
  }
  //** Очистить форму */
  private _resetForm() {
    this.advertForm.reset();
    this._deleteCategoryField(0);
    this._clearInputCost();
    this._setIsResetDropdown(true);
    this._deleteImage(null);
    console.log(this.isResetDropdown);
  }
  private _clearInputCost() {
    this.cost = "reset";
  }
  //** переход по ссылке на другую страницу */
  onGoTo(value: string) {
    this.router.navigateByUrl(`${value}`);
  }
  ngOnDestroy(): void {
    this._unGetCurrentUser.unsubscribe();
    // this._unGetIsEdit.unsubscribe();
    // this._unGetAdvert.unsubscribe();
  }
}
