import { IPost } from "./IPost";

export interface IUser {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  friends: IUser[];
  posts: IPost[];
}
