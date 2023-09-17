export interface ICategoryMenu {
  id: number;
  category: string;
  // url: string;
  body: ISubCategoryMenu[];
}

export interface ISubCategoryMenu {
  id: number;
  subcategory: string;
  // url: string;
  // body: ISubCategoryItems209[] | null;
  body: string[] | null;
}

export interface ISubCategoryItems {
  id: number;
  link: string;
  url: string;
}
