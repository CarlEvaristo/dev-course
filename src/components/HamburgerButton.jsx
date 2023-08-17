import React from 'react'
import "./hamburgerButton.css"

export default function HamburgerButton(props) {
  return (
    <div className='hamburgerMenu' onClick={props.toggleMenu}>
        <div className={`hamburgerBar ${props.menuOn ? "topBar" : "topBarBack"}`}></div>
        <div className={`hamburgerBar ${props.menuOn ? "middleBar" : "middleBarBack"}`}></div>
        <div className={`hamburgerBar ${props.menuOn ? "bottomBar" : "bottomBarBack"}`}></div>
    </div>
  )
}
