import { useState } from "react"
import type { User } from "../model/user"
import { UserContext } from "./UserContext";

export const UserContextProvider:React.FC<React.PropsWithChildren> = ({children})=>{
    const[ctxUser, setCtxUser] = useState<User>({email:'', username:'', score:0});

    const updateUser=(user:User)=>{
        setCtxUser(user)
    };

    return(
        <>
            <UserContext.Provider value={{user:ctxUser, setUser:updateUser}}>
                {children}
            </UserContext.Provider>
        </>
    )
}