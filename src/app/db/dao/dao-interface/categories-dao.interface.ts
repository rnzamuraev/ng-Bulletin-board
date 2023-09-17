import { ICategoryMenu } from "../../types/category.interface";
import { ICommonDao } from "./common-dao.interface";

export interface ICategoriesDao extends ICommonDao<ICategoryMenu> {}
