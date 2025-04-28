import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import AppContentContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AppContentContextProvider>
            <App />
        </AppContentContextProvider>
    </StrictMode>
)
