import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Game from "../pages/Game";
import { Home } from "../pages/Home";
import { ProtectedRouter } from "./ProtectedRouter";
import { PageTemplate } from "../pages/PageTemplate";

export const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <>

            <Route element={<PageTemplate/>} >
                <Route path="/" element={<Home/>} />
                    <Route element = {<ProtectedRouter />} >
                        <Route path="/game" element={<Game />} />   
                    </Route>
                </Route>
        </>
    )
);