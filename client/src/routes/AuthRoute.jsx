import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {useAppContentContext} from '../utils/context'

export default function AuthRoute() {
    const {isLoggedIn} = useAppContentContext()

    return !isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />
}
