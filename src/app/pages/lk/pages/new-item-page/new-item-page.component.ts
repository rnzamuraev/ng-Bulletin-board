import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { CategoryService } from "src/app/shared/services/category-service/category.service";
import { UserService } from "src/app/shared/services/user-service/user.service";
import { ICategory } from "src/app/shared/types/category.interface";
import { IUser } from "src/app/shared/types/user.interface";
import { IAddAdverts, IImageObj } from "../../types/adverts.interface";
import { LocalStorageService } from "src/app/shared/services/local-storage-service/local-storage.service";
import { EStaticVar } from "src/app/shared/types/staticVar.enum";
import { Subscription } from "rxjs";

@Component({
  selector: "app-new-item-page",
  templateUrl: "./new-item-page.component.html",
  styleUrls: ["./new-item-page.component.scss"],
})
export class NewItemPageComponent implements OnInit {
  private _unsubscribeGetCurrentUser!: Subscription;
  private _address!: string;

  categories!: ICategory[];
  // newCategories!: ICategory[];
  selectedCategory: ICategory | null = null;
  arrayImage: IImageObj[] = [];
  imageObj!: IImageObj;
  advertForm!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._fetchCategoryById(0);
    this._initializeAddress();
    // this._initializeGetCurrentUser();
    this._initializeForm();
  }

  //**? При загрузке страницы */
  //** Получаем адрес пользователя если он сохранял его*/
  private _initializeAddress() {
    const address = this.localStorage.get(EStaticVar.LOCATION_KEY);
    if (typeof address === "string") {
      // console.log(address);
      this._address = address;
    }
  }
  //** Получаем текущего пользователя если он вошел в аккаунт */
  // private _initializeGetCurrentUser() {
  //   this.userService.getCurrentUser.subscribe((data: IUser | null) => {
  //     if (data) {
  //       console.log(data);
  //       this.phone = data.name;
  //     }
  //   });
  // }
  //** Активируем форму */
  private _initializeForm() {
    this.advertForm = new FormGroup({
      categoryId: new FormArray([
        new FormGroup({
          category: new FormControl("", [Validators.required]),
        }),
      ]),
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      location: new FormControl(this._address),
      images: new FormControl([""]),
      cost: new FormControl("", [Validators.required]),
    });
  }
  //** Получаем с сервера список категорий при загрузке страницы и при изменениях ID когда он передан*/
  private _fetchCategoryById(index: number) {
    let id = "";
    // console.log(this.selectedCategory);
    if (this.selectedCategory) id = this.selectedCategory.id;

    console.log(id);
    this.categoryService.fetchCategoryById(id).subscribe((data: ICategory[]) => {
      console.log(data);
      this.categories = data;
      if (data.length <= 0) return;
      // this.newCategories = data;

      //** Добавляем новое поле категорий если была выбрана текущая категория*/
      if (this.selectedCategory) this._addNewCategoryField(index);
    });
  }

  //**? После загрузке страницы */
  //** Добавляем новое поле категорий по индексу*/
  private _addNewCategoryField(index: number): void {
    //** Удаляем поля категорий если предыдущее было изменено */
    this._deleteCategoryField(index, this.advertForm.value.categoryId);

    (this.advertForm.controls["categoryId"] as FormArray).push(
      new FormGroup({
        category: new FormControl("", [Validators.required]),
      })
    );
  }
  //** Удаляем поля категорий если предыдущее было изменено или очищено */
  private _deleteCategoryField(index: number, categories: AbstractControl[]) {
    console.log(categories.length);
    console.log(index);
    for (let i = categories.length - 1; i > index; i--) {
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
      this._deleteCategoryField(index, this.advertForm.value.categoryId);
    }
  }
  // ** Заносим изменения в контроллер формы при изменении текущего или добавлении нового */
  private _patchValue(index: number, category: null | ICategory) {
    let value!: string | null;
    if (category) value = category.id;
    // this.advertForm.value.categoryId[index].category = props.id;
    else value = category;
    // this.advertForm.value.categoryId[index].category = null;
    this.advertForm
      .get("categoryId")
      ?.get(`${index}`)
      ?.patchValue({ category: value }, { emitEvent: false });
  }
  // ** Создаем новый объект фото или очищаем текущий */
  private _createImageObj() {
    this.imageObj = {
      name: "",
      url: "",
      size: "",
      path: "",
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
    reader.onload = () => {
      // console.log(reader.result);
      this._createImageObj();
      this.imageObj.name = file.name;
      this.imageObj.path = this.advertForm.value["images"];
      this.imageObj.size = this._setImageSize(file.size);
      this.imageObj.url = reader.result;
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

  onDeleteImage(img: IImageObj) {
    this.arrayImage = this.arrayImage.filter((elem: IImageObj) => elem !== img);
  }

  onAddNewAdvert() {
    console.log(this.advertForm);
    const advert: IAddAdverts = {
      ...this.advertForm.value,
      categoryId: this.advertForm.value.categoryId[this.advertForm.value.categoryId.length],
    };
    this.advertForm.value;
    console.log(this.advertForm);
  }

  onGoTo(value: string) {
    this.router.navigateByUrl(`${value}`);
  }
}
