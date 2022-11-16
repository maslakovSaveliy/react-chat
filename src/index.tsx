import { getAuth } from "firebase/auth";
import React from "react";
import ReactDOM from "react-dom/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import App from "./App";
import "./firebase";
import { setupStore } from "./store/store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const store = setupStore();
const auth = getAuth();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
