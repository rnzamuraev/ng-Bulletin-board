import { ICategoryChild } from "./category.interface";

export interface IBreadcrumbs {
  link: string;
  label: string;
  // categoryId: string;
  category: ICategoryChild | null;
}
