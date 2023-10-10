// import { IPost } from "./post.interface";

export interface IAuthLogin {
  phone: string;
  password: string;
}
export interface IAuthRegister extends IAuthLogin {
  name: string;
}
