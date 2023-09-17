export interface ICategoryMenu {
  id: number;
  category: string;
  body: ISubCategoryMenu[];
}

export interface ISubCategoryMenu {
  id: number;
  subcategory: string;
  body: string[] | null;
}

export interface ISubCategoryLink {
  subcategory: string;
  subcategoryItem: string;
}

export interface ICategoryLink extends ISubCategoryLink {
  category: string;
}
