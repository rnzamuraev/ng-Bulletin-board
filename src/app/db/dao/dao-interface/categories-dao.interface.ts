import { ICategoryMenu } from "src/app/shared/types/category.interface";
import { ICommonDao } from "./common-dao.interface";

export interface ICategoriesDao extends ICommonDao<ICategoryMenu> {}
