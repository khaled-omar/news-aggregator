import {createBrowserRouter} from "react-router-dom";
import {authRoutes} from "./authRoutes";
import {routes} from "./routes.jsx";

const router = createBrowserRouter([
    ...authRoutes,
    ...routes
]);

export default router
