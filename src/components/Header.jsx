import React from 'react'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useScrollPosition from '../hooks/useScrollPosition';

import "./header.css"

export default function Header() {
  const location = useLocation()
  const scrollY = useScrollPosition();

  const headerScroll = scrollY > 0 ? "headerBg" : "headerBgTransparent";

  return (
    <header className={headerScroll}>
        <div className="header-container">
            <div className='logo'>
                <i className="fa-solid fa-file-code fa-xl"></i>
                <h3>codewithcarl</h3>
            </div>
            <nav>
                <NavLink 
                to="/"
                className={`link ${location.pathname === "/" && "active-link"}`}
                >
                    Home
                </NavLink>

                <NavLink 
                    to="/courses"
                    className={`link ${location.pathname === "/courses" && "active-link"}`}
                >
                    Courses
                </NavLink>

                <NavLink 
                    to="/login"
                    className={`link ${location.pathname === "/login" && "active-link-login"}`}
                >
                    Login
                </NavLink>
            </nav>
        </div>
    </header>
  )
}
