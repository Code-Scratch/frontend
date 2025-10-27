import { useEffect, useState } from "react"
import { UserContext } from "./UserContext";
import type { User } from "../model/User";
import { registerSetUser } from "../pages/helps/UpdateContextUser";

export const UserContextProvider:React.FC<React.PropsWithChildren> = ({children})=>{
    const[ctxUser, setCtxUser] = useState<User>({id:'', email:'', username:'', score:0});

    const updateUser=(user:User)=>{
        setCtxUser(user)
    };

    useEffect(() => {
    registerSetUser(setCtxUser);
  }, []);

    return(
        <>
            <UserContext.Provider value={{user:ctxUser, setUser:updateUser}}>
                {children}
            </UserContext.Provider>
        </>
    )
}