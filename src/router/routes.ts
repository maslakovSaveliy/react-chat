import { IRoute } from "../models/IRoute";
import Home from "../pages/Home";
import Login from "../pages/LogIn";
import Signup from "../pages/SignUp";

export const privateRoutes: IRoute[] = [{ path: "/", element: Home }];

export const publicRoutes: IRoute[] = [
  { path: "/login", element: Login },
  { path: "/signup", element: Signup },
];
