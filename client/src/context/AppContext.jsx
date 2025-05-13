import { useEffect, useState } from "react";
import { AppContentContext } from "../utils/context";
import axios from "axios";
export default function AppContentContextProvider({ children }) {
  const backEndURL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState(false);
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backEndURL}/api/user/get-user`, {
        withCredentials: true,
      });

      data.success ? setUserData(data.user) : "";
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAuthState = async () => {
    const { data } = await axios.get("/get-auth", { withCredentials: true });
    if (data.success) {
      setIsLoggedIn(true);
      getUserData();
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const handleLogin = async (userData) => {
    try {
      const { data } = await axios.post(
        `${backEndURL}/api/auth/login`,
        userData,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        console.log("Login sakses");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // handleRegister = (userData) => {
  //   console.log(userData);
  // };
  // handleLogout = () => {
  //   console.log("logout");
  // };
  const values = {
    isLoggedIn,
    setIsLoggedIn,
    backEndURL,
    userData,
    setUserData,
    getUserData,
    getAuthState,
    handleLogin,
  };
  return (
    <AppContentContext.Provider value={values}>
      {children}
    </AppContentContext.Provider>
  );
}
