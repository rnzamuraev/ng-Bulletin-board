import { ICategory, ICategoryChild } from "src/app/shared/types/category.interface";

interface IAdvert {
  name: string;
  location: string;
  imagesIds: string[];
  cost: number;
}
export interface IAdvertSearchReq {
  search: string;
  showNonActive: true; //**! boolean */
  category: string;
}
export interface IAdvertSearchRes {
  adverts: IAdvertUser[];
  category: ICategoryChild | null;
  count: number;
}
export interface IAdvertUser extends IAdvert {
  id: string;
  createdAt: string;
  isActive: true; //**! boolean */
  categoryId?: string;
}
export interface IAddAdvert extends IAdvert {
  description: string;
  email: string;
  phone: string;
  categoryId: string | null;
  // categoryId: string;
}
export interface IAdvertById extends IAdvert {
  id: string;
  user: IAdvertUser;
  description: string;
  isActive: true;
  email: string;
  phone: string;
  created: string;
  category: ICategory;
}
export interface IAdvertImage {
  advertId: string; //Идентификатор объявления
  content: string; // ($binary) Массив байтов, содержащий изображение
}
export interface IImageObj {
  name: string;
  url: string | ArrayBuffer | null;
  size: string;
  file: File | null;
  imageId: string;
}
