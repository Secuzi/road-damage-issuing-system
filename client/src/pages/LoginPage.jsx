import React from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import useLoginForm from "../hooks/useLoginForm";
import axios from "axios";
export default function LoginPage() {
  const { control, handleSubmit } = useLoginForm();
  const navigate = useNavigate();
  const handleLogin = async (userData) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        userData,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        console.log("Login sakses");
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form
      className="w-[350px] flex flex-col item py-4 px-8 rounded-xl shadow-md shadow-slate-400 text-font-color"
      onSubmit={handleSubmit(handleLogin)}
    >
      <h2 className="my-4 text-2xl font-bold text-center">Login</h2>
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
      <Checkbox />
      <Button text="Submit" className="my-4" />
      <p className="text-sm">
        Don't have an account?
        <Link to="/auth/register" className="ml-2 underline text-accent">
          Register
        </Link>
      </p>
    </form>
  );
}
