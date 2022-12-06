import { Timestamp } from "firebase/firestore";

export interface IPost {
  title: string;
  body: string;
  createdAt: Timestamp | null;
  id: number | null;
}
