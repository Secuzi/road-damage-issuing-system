import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContentContext } from "../utils/context";
export default function UserRoute() {
  const { isLoggedIn } = useAppContentContext();
  return isLoggedIn ? "" : "";
}
