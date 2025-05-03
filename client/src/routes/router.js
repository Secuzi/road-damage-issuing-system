import {createBrowserRouter} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <h1>Auth</h1>,
        children: [
            {
                path: 'login',
                element: <h1>Login</h1>,
            },
            {
                path: 'register',
                element: <h1>Register</h1>,
            },
        ],
    },
])

export default router
