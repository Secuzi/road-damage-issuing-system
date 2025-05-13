import {RouterProvider} from 'react-router-dom'
import router from './routes/Router.jsx'

export default function App() {
    return <RouterProvider router={router}></RouterProvider>
}
