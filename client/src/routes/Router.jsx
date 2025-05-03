import {createBrowserRouter} from 'react-router-dom'
import AuthRoute from './AuthRoute'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import PageNotFound from '../pages/PageNotFound'

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthRoute />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
])

export default router
