export interface ICategory {
  id: number;
  category: string;
}

export interface ICategoryMenu extends ICategory {
  body: ISubCategoryMenu[];
}

export interface ISubCategoryMenu extends ICategory {
  body: ICategory[] | null;
}
