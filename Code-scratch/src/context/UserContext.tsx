import { createContext } from "react";
import type { UserContextValue } from "./UserContextValue";

export const UserContext : React.Context<UserContextValue>= createContext<UserContextValue>({
    user:{id:'', email:'', username:'', score:0},

    setUser:()=>{}
})