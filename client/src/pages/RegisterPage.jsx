import React from 'react'
import {Link} from 'react-router-dom'
import TextField from '../components/TextField'
import Button from '../components/Button'

export default function () {
    return (
        <form className="w-[350px] flex flex-col item py-4 px-8 rounded-xl shadow-md shadow-slate-400 text-font-color">
            <h2 className="my-4 text-2xl font-bold text-center">Register</h2>
            <TextField
                name="username"
                label="Username"
                type="text"
                placeholder="Enter your username"
            />
            <TextField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
            />
            <TextField
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
            />
            <Button text="Submit" className="my-4" />
            <p className="text-sm">
                Already have an account?
                <Link
                    to="/auth/login"
                    className="text-accent-color underline text-accent-color 
                    ">
                    Login
                </Link>
            </p>
        </form>
    )
}
