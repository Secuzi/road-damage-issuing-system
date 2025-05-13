import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import Introduction from '../components/Introduction'

export default function AuthLayout() {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex flex-row justify-around items-center">
                <Introduction />
                <Outlet />
            </div>
        </div>
    )
}
