import React from 'react'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import "./header.css"

export default function Header() {
  const location = useLocation()

  return (
    <header>
        <nav>
            <NavLink 
                to="/"
                className={location.pathname === "/" && "inactive-link"}
            >
                Home
            </NavLink>

            <NavLink 
                to="/courses"
                className={location.pathname === "/courses" && "inactive-link"}
            >
                Courses
            </NavLink>
        </nav>
    </header>
  )
}
