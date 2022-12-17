import { Auth, getAuth, User } from "firebase/auth";
import {
  collection,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { app } from "../../firebase";
import { IUser } from "../../models/IUser";
import { AppDispatch } from "../store";
import { authSlice } from "./authSlice";
import { usersSlice } from "./usersSlice";
export const fetchUsers =
  (firestore: Firestore, uid: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(usersSlice.actions.usersFetching());
      const user = await getDoc(doc(firestore, "users", uid));
      dispatch(usersSlice.actions.usersFetchingSucces(user.data()));
    } catch (e: any) {
      dispatch(usersSlice.actions.usersFetchingError(e.message));
    }
  };
export const setAuthUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.setAuth);
    const auth = await getAuth();
    dispatch(authSlice.actions.setAuthSucces(auth));
  } catch (e: any) {
    dispatch(authSlice.actions.setAuthError(e.message));
  }
};
