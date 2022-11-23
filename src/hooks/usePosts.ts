import { getAuth, User } from "firebase/auth";
import {
  collection,
  DocumentData,
  Firestore,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
interface Posts {
  userPosts: DocumentData | null | undefined;
  postsLoading: boolean;
}
interface Props {
  firestore: Firestore;
  user: User;
}
export const usePosts = ({ firestore, user }: Props) => {
  const [posts, setPosts] = useState<Posts>({
    userPosts: null,
    postsLoading: true,
  });
  const [userPosts, isLoading, errorPosts] = useCollectionData(
    query(collection(firestore, "posts"), orderBy("createdAt"))
  );
  useEffect(() => {
    setPosts({ ...posts, postsLoading: true });
    const dbPosts = userPosts?.filter(
      (post) => post.displayName == user?.displayName
    );
    setPosts({ ...posts, userPosts: dbPosts, postsLoading: false });
  }, []);
  return posts;
};
