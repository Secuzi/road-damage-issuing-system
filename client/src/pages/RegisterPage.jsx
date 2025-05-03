import React from 'react'
import {Link} from 'react-router-dom'
import useRegisterForm from '../hooks/useRegisterForm'
import TextField from '../components/TextField'
import Button from '../components/Button'

export default function () {
    const {control, handleSubmit} = useRegisterForm()

    return (
        <form
            className="w-[350px] flex flex-col item py-4 px-8 rounded-xl shadow-md shadow-slate-400 text-font-color"
            onSubmit={handleSubmit((data) => console.log(data))}>
            <h2 className="my-4 text-2xl font-bold text-center">Register</h2>
            <TextField
                control={control}
                name="username"
                label="Username"
                type="text"
                placeholder="Enter your username"
            />
            <TextField
                control={control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
            />
            <TextField
                control={control}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
            />
            <Button text="Submit" className="my-4" />
            <p className="text-sm">
                Already have an account?
                <Link to="/auth/login" className="ml-2 underline text-accent">
                    Login
                </Link>
            </p>
        </form>
    )
}
