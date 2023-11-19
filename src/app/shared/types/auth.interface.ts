// import { IPost } from "./post.interface";

export interface IAuthLogin {
  login: string;
  password: string;
}
export interface IAuthRegister extends IAuthLogin {
  name: string;
}
