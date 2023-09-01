import React from 'react'
import "./popup.css"

export default function Popup({ clickHandler, color, children }) {

    return (  
        <div className={`popupContainer`} onClick={clickHandler}>
            <div className={`popupBox`} style={{backgroundColor: color}}>
                {children}
            </div>
        </div>  
    )
}
