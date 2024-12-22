import {createBrowserRouter} from "react-router-dom";
import {authRoutes} from "./authRoutes";
import {newsRoutes} from "./newsRoutes.jsx";

const router = createBrowserRouter([
    ...authRoutes,
    ...newsRoutes
]);

export default router
