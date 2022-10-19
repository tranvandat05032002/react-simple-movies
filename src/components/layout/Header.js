import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navLinkClass = ({ isActive }) => {
    return isActive ? "text-primary" : "";
  };
  return (
    <header className="flex items-center justify-center py-10 mb-10 text-white header gap-x-5">
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={navLinkClass}>
        Movies
      </NavLink>
      <NavLink to="/movies2" className={navLinkClass}>
        Movies2
      </NavLink>
    </header>
  );
};

export default Header;
