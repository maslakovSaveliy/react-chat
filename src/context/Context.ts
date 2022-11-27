import { createContext } from "react";
interface IContext {
  [key: string]: any;
}
export const Context = createContext<IContext>({});
