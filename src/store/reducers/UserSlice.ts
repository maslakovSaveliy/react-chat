import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, User } from "firebase/auth";
interface AuthState {
  auth: Auth | null;
  account: User | null;
}
const initialState: AuthState = {
  auth: null,
  account: null,
};
export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Auth>) {
      state.auth = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.account = action.payload;
    },
  },
});

export default userSlice.reducer;
