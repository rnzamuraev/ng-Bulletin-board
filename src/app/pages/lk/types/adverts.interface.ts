import { ICategory } from "src/app/shared/types/category.interface";

export interface IAdverts {
  id: string;
  user: IAdvertsUser;
  name: string;
  description: string;
  isActive: true;
  imagesIds: string[];
  cost: number;
  email: string;
  phone: string;
  location: string;
  created: string;
  category: ICategory;
}
export interface IAddAdverts {
  name: string;
  description?: string;
  images?: string[];
  cost: number;
  email?: string;
  phone: string;
  location: string;
  categoryId: string;
}
export interface IAddAdverts {
  name: string;
  description?: string;
  images?: string[];
  cost: number;
  email?: string;
  phone: string;
  location: string;
  categoryId: string;
}
export interface IAdvertsUser {
  id: string;
  name: string;
}

export interface IAdvertsSearch {
  search: string;
  showNonActive: true; //**! boolean */
  category: string;
}
export interface IAdvertById {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  isActive: true; //**! boolean */
  imagesIds: string[];
  cost: 0;
}
export interface IImageObj {
  name: string;
  url: string | ArrayBuffer | null;
  size: string;
  path: string;
}
