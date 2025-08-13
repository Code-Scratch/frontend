import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate, Outlet } from "react-router-dom";

export const DistributePage = () => {
    const {user} = useContext(UserContext);

    const page = user.email === '' ? '/' : '/game'

    return (
        <>
        <Outlet/>
        <Navigate to={`/${page}`}/>
        </>
    )
}