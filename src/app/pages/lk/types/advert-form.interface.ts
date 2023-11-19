import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { IAuthRegister } from "src/app/shared/types/auth.interface";

export interface IAdvertFormCategory {
  category: FormControl<string | null>;
}

export interface IAdvertForm {
  categoryId: FormArray<FormGroup<IAdvertFormCategory>>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  location: FormControl<string | null>;
  images: FormControl<string[] | null>;
  cost: FormControl<string | null>;
}
export interface IPartialAdvert {
  categoryId: Partial<{
    category: string | null;
  }>[];
  name: string | null;
  description: string | null;
  location: string | null;
  images: string[] | null;
  cost: string | null;
}

export interface ISettingsForm {
  name: string;
  login: string;
  location: string;
}
export interface ISettingsFormSubmit {
  name: string;
  login: string;
  location: string | null;
  password: string | null;
  prevPassword: string | null;
}
