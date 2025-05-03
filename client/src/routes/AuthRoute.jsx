import React from 'react'
import {Navigate} from 'react-router-dom'
import {useAppContentContext} from '../utils/context'
import AuthLayout from '../layouts/AuthLayout'

export default function AuthRoute() {
    const {isLoggedIn} = useAppContentContext()

    return !isLoggedIn ? <AuthLayout /> : <Navigate to="/auth/login" />
}
