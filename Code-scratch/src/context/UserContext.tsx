import { createContext } from "react";
import type { UserContextValue } from "./UserContextValue";

export const UserContext : React.Context<UserContextValue>= createContext<UserContextValue>({
    user:{email:'', username:'', score:0},

    setUser:()=>{}
})