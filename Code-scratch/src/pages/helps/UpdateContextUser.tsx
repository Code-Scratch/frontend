import type { User } from "../../model/User";

let setUserFn: ((user: User) => void) | null = null;

export const registerSetUser = (fn: (user: User) => void) => {
  setUserFn = fn;
};

export const UpdateContextUser = (usuario: User) => {
  if (setUserFn) {
    setUserFn(usuario);
  }
};