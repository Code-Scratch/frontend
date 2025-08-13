import type { User } from "../model/user";

export type UserContextValue = {
    user:User,

    setUser:(newUser:User)=>void,
};