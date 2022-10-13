import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navLinkClass = ({ isActive }) => {
    return isActive ? "text-primary" : "";
  };
  return (
    <header className="header flex items-center justify-center gap-x-5 mb-10 py-10">
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={navLinkClass}>
        Movies
      </NavLink>
    </header>
  );
};

export default Header;
