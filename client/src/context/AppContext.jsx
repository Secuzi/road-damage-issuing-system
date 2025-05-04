import {useState} from 'react'
import {AppContentContext} from '../utils/context'
import {login, register, logout} from '../services/authService'

export default function AppContentContextProvider({children}) {
    const backEndURL = import.meta.env.BACKEND_URL
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState({})

    const handleLogin = async (userData) => {
        try {
            const data = await login(userData)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleRegister = async (userData) => {
        try {
            const data = await register(userData)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogout = () => {
        console.log('logout')
    }

    const values = {
        isLoggedIn,
        setIsLoggedIn,
        backEndURL,
        userData,
        setUserData,
        handleLogin,
        handleRegister,
        handleLogout,
    }

    return (
        <AppContentContext.Provider value={values}>
            {children}
        </AppContentContext.Provider>
    )
}
