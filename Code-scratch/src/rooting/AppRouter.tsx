import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Game from "../pages/Game";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { ProtectedRouter } from "./ProtectedRouter";
import { PageTemplate } from "../pages/PageTemplate";

export const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <>

            
            <Route path="/" element={<Home/>} />
                <Route element={<PageTemplate/>} >
                    <Route path="/login" element={<Login/>} />
                    <Route element = {<ProtectedRouter />} >
                        <Route path="/game" element={<Game />} />   
                    </Route>
                </Route>
        </>
    )
);