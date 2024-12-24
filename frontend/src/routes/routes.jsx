import Home from '../pages/Home.jsx'
import ProtectedRoute from './ProtectedRoute.js'
import ProfilePage from '../pages/ProfilePage.jsx'
import ErrorPage from '../pages/ErrorPage.jsx'

export const routes = [
    {
        path: "/",
        element: <ProtectedRoute><Home/></ProtectedRoute>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/profile",
        element: <ProtectedRoute><ProfilePage/></ProtectedRoute>,
    },
]
