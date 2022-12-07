import { Timestamp } from "firebase/firestore";

export interface IPost {
  title: string;
  body: string;
  createdAt: Timestamp;
  id: number | null;
}
