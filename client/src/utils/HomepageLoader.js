import axios from "axios";
import { redirect } from "react-router-dom";

export const HomepageLoader = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/get-auth`,
      { withCredentials: true }
    );
    console.log(data);
    //Subject for discussion
    return null;
  } catch (error) {
    console.log("In Error: ", error.response.data.message);
    return redirect("/auth/login");
  }
};
