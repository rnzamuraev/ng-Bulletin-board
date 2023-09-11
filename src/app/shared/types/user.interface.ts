import { IPost } from "./post.interface";

export interface IUserLogin {
  phone: string;
  password: string;
}
export interface IAddUser extends IUserLogin {
  name: string;
}
export interface IUserResponse extends IAddUser {
  id: number;
  email: string;
  avatar: string;
  posts?: IPost[];
}
