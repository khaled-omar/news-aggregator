import RegisterForm from "../pages/RegisterForm";
import LoginForm from "../pages/LoginForm";
import AuthRoute from './AuthRoute.js'

export const authRoutes = [
    {
        path: "/register",
        element: <AuthRoute><RegisterForm/></AuthRoute>,
    },
    {
        path: "/login",
        element: <AuthRoute><LoginForm/></AuthRoute>,
    },

]
