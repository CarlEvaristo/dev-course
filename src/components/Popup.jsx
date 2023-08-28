import React from 'react'
import "./popup.css"

export default function Popup({ showPopup, clickHandler, children }) {

    return (  
        <div className={`popupContainer`} onClick={clickHandler}>
            <div className={showPopup ? "popupBox" : "popupSlide"}>
                {children}
            </div>
            <div className="popupBox">
                {children}
            </div>
        </div>  
    )
}
