import React from "react";
import ThemeController from "./ThemeController";
import { Link } from "react-router-dom";

export default function Header({ children }) {
  return (
    <header className="flex flex-row justify-around itnems-center p-8">
      <Link to="/" className="flex-[.2] text-lg font-bold">
        RoadBusters
      </Link>
      <nav className="flex-[.5]">{children}</nav>
      <ThemeController />
    </header>
  );
}
