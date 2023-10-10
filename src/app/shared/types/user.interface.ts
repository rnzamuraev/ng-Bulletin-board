export interface IUser {
  id: string;
  name: string;
  role: string;
  adverts: IUserAdverts[];
  registeredTime: string;
}
export interface IUserAdverts {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  isActive: true;
  imagesIds: string[];
  cost: number;
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
export interface IUpdateUserResponse {
  id: string;
  name: string;
}
