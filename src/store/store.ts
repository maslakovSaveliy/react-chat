import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postSlice from "./reducers/PostSlice";
const rootReducer = combineReducers({ postSlice });
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
