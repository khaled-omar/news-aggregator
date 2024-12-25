import Home from '../pages/Home.jsx'
import ProtectedRoute from './ProtectedRoute.js'
import ProfilePage from '../pages/ProfilePage.jsx'
import ErrorPage from '../pages/ErrorPage.jsx'
import Layout from '../components/layout/Layout.jsx'

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                  <ProtectedRoute>
                      <Home />
                  </ProtectedRoute>
                ),
            },
            {
                path: 'profile',
                element: (
                  <ProtectedRoute>
                      <ProfilePage />
                  </ProtectedRoute>
                ),
            },
            {
              path: '*',
              element: (
                  <ErrorPage />
              ),
            },
        ],
    },
]
