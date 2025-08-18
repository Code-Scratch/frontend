import type { User } from "../model/User";


export type UserContextValue = {
    user:User,

    setUser:(newUser:User)=>void,
};