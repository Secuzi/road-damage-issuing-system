import {RouterProvider} from 'react-router-dom'
import router from './routes/Router.jsx'
import ThemeController from './components/ThemeController.jsx'

export default function App() {
    // return <RouterProvider router={router}></RouterProvider>
    return (
        <>
            <input
                type="checkbox"
                value="prefersdark"
                className="toggle theme-controller"
            />
            <h2>adadas</h2>
        </>
    )
}
