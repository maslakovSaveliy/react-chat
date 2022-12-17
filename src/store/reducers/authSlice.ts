import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, User } from "firebase/auth";

interface AuthSlice {
  auth: Auth | null;
  isAuthLoading: boolean;
  authError?: string;
}
const initialState: AuthSlice = {
  auth: null,
  isAuthLoading: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state) {
      state.isAuthLoading = true;
    },
    setAuthSucces(state, action: PayloadAction<Auth>) {
      state.auth = action.payload;
      state.isAuthLoading = false;
    },
    setAuthError(state, action: PayloadAction<string>) {
      state.authError = action.payload;
    },
  },
});
export default authSlice.reducer;
