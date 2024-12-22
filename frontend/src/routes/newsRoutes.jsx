import Home from '../Home.jsx'
import ProtectedRoute from './ProtectedRoute.js'

export const newsRoutes = [
    {
        path: "/",
        element: <ProtectedRoute><Home/></ProtectedRoute>,
    },
]
