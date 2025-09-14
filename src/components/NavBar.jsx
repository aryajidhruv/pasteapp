import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const linkClasses =
    "px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition";

  return (
    <div className="flex flex-row gap-4 p-4 border-b border-gray-300">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? "font-semibold underline" : ""}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? "font-semibold underline" : ""}`
        }
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default NavBar;
