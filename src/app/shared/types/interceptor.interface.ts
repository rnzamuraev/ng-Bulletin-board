export interface IBase {
  url: string;
  setHeaders: IBaseSetHeaders;
}
export interface IBaseSetHeaders {
  "Content-Type": string;
  Authorization: string;
}
export interface IDadata {
  url: string;
  setHeaders: IDadataSetHeaders;
}
export interface IDadataSetHeaders extends IBaseSetHeaders {
  Accept: string;
  "X-Secret": string;
}
