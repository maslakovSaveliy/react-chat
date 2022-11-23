import { getAuth } from "firebase/auth";
import { collection, getFirestore, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AppDispatch } from "../store";
import { postSlice } from "./PostSlice";

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(postSlice.actions.setPosts());
    const firestore = await getFirestore();
    const auth = await getAuth();
    const [user] = await useAuthState(auth);
    const [posts] = await useCollectionData(
      query(collection(firestore, "posts"), orderBy("createdAt"))
    );
    const userPosts = await posts?.filter(
      (post) => post.displayName == user?.displayName
    );
    dispatch(postSlice.actions.setPostsSucces(userPosts));
  } catch (e: any) {
    dispatch(postSlice.actions.setPostsError(e));
  }
};
