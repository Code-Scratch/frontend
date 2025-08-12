import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Game from "../pages/Game";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/game" element={<Game />} />
                
        </>
    )
);