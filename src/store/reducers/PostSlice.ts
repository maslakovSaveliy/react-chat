import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData, Timestamp } from "firebase/firestore";
interface PostsState {
  posts: DocumentData[] | undefined;
  isLoading: boolean;
  error?: string;
}
const initialState: PostsState = {
  posts: undefined,
  isLoading: false,
};
export const postSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPosts(state) {
      state.isLoading = true;
    },
    setPostsSucces(state, action: PayloadAction<DocumentData[] | undefined>) {
      state.isLoading = false;
      state.posts = action.payload;
    },
    setPostsError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export default postSlice.reducer;
