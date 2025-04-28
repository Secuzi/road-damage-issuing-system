import { useState } from "react";
import { AppContentContext } from "../utils/context";

export default function AppContentContextProvider({ children }) {
  const backEndURL = import.meta.env.BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const values = {
    isLoggedIn,
    setIsLoggedIn,
    backEndURL,
    userData,
    setUserData,
  };

  return (
    <AppContentContext.Provider value={values}>
      {children}
    </AppContentContext.Provider>
  );
}
