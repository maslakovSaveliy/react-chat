import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { IUser } from "../../models/IUser";

interface UsersState {
  user: IUser | DocumentData | undefined;
  isLoading: boolean;
  error?: string;
}
const initialState: UsersState = {
  user: undefined,
  isLoading: false,
};
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true;
    },
    usersFetchingSucces(
      state,
      action: PayloadAction<IUser | DocumentData | undefined>
    ) {
      state.user = action.payload;
      state.isLoading = false;
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
export default usersSlice.reducer;
