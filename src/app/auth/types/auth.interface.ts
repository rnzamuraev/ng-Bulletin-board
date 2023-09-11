export interface ILoginRequest {
  phone: string;
  password: string;
}

export interface IRegisterRequest extends ILoginRequest {
  name: string;
}

export interface ITextProps {
  header: string;
  btnText: string;
}
