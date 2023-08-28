import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';

import HamburgerButton from "./HamburgerButton"
import useScrollPosition from '../../hooks/useScrollPosition';
import "./header.css"

export default function Header() {
  const [menuOn, setMenuOn] = useState(false)
  const location = useLocation()
  const scrollY = useScrollPosition();
  const headerScroll = (scrollY > 0 || menuOn) ? "headerBg" : "headerBgTransparent";

  function toggleMenu() {
      setMenuOn(prev => !prev)
  }

  return (
    <header className={headerScroll}>
        <div className="header-container">
            <div className='logo'>
                <i className="fa-solid fa-file-code fa-xl"></i>
                <h3>codewithcarl</h3>
            </div>
            <nav className={`menu ${ menuOn ? "moveDown" : "moveUp" }`}>
                <NavLink
                onClick={() => setMenuOn(false)}
                to="/"
                className={`link ${location.pathname === "/" && "active-link"}`}
                >
                    Home
                </NavLink>

                <NavLink
                    onClick={() => setMenuOn(false)}
                    to="/courses"
                    className={`link ${location.pathname === "/courses" && "active-link"}`}
                >
                    Courses
                </NavLink>

                <NavLink
                    onClick={() => setMenuOn(false)}
                    to="/login"
                    className={`link ${location.pathname === "/login" && "active-link-login"}`}
                >
                    <i className="fa-solid fa-user"></i> Login
                </NavLink>
            </nav>

            <HamburgerButton toggleMenu={toggleMenu} menuOn={menuOn} />


        </div>
    </header>
  )
}
