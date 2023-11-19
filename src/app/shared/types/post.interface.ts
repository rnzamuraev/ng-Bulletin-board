export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface INewPost extends IPost {
  name: string;
}
