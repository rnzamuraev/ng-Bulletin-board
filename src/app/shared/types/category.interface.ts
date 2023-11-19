// export interface ICat {
//   id: number;
//   category: string;
// }

// export interface ICategoryMenu extends ICat {
//   body: ISubCategoryMenu[];
// }

// export interface ISubCategoryMenu extends ICat {
//   body: ICat[] | null;
// }
export interface ICategory {
  id: string;
  parentId: string;
  name: string;
  childs?: ICategory[];
}
// export interface IChildsCategory extends ICategory {
//   childs: ICategory[];
// }
export interface ICategoryChild extends ICategory {
  childs: ICategoryChild[];
}
// export interface ICategoryChild extends ICategory {
//   childs: ICategoryChild[];
// }
