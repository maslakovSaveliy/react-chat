import { IRoute } from "../models/IRoute";
import Home from "../pages/Home";
import Login from "../pages/LogIn";
import Profile from "../pages/Profile";
import Signup from "../pages/SignUp";

export const privateRoutes: IRoute[] = [
  { path: "/", element: Home },
  { path: "/profile", element: Profile },
];

export const publicRoutes: IRoute[] = [
  { path: "/login", element: Login },
  { path: "/signup", element: Signup },
];
