import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouter=()=>{
    const {user} = useContext(UserContext);

    return(
        <>
            { user.email ==='' ? (
                <Navigate to='/'/>
            ):(
                <Outlet/>
            )
            }
        </> 
    )
}