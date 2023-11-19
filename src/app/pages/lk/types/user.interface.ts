import { IUser } from "src/app/shared/types/user.interface";

export interface INewUser extends IUser {
  phone: string;
  address: string;
}
