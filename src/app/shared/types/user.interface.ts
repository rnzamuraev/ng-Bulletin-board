import { IAdvertUser } from './adverts.interface'

export interface IUserResponse {
  id: string;
  name: string;
}
export interface IUser extends IUserResponse {
  role: string;
  adverts: IAdvertUser[];
  registeredTime: string;
}
export interface IGetUserId {
  id: string;
  register: boolean;
}
export interface IUpdateUser {
  name: string; //Имя пользователя
  login: string; //Телефон
  password: string; //Пароль
}
