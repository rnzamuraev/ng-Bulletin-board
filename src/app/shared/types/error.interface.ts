export interface IError {
  errorCode: string;
  userMessage: string;
  internalErrors: string[];
}
export interface IErrorMessage {
  login?: string[];
  name?: string[];
  password?: string[];
  images?: string[];
  description?: string[];
  location?: string[];
  cost?: string[];
  errors?: string[];
}
