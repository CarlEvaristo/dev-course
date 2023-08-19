import React from 'react'
import Box from './Box'
import "./popup.css"

export default function Popup({ showPopup, clickHandler, children }) {
    const popupStyle = {
        position:"relative",
        backgroundColor: "#86DFA7",
        maxWidth: "500px",
        width: "90%",
        padding: "1rem",
    }

    return (  
        <>
            {showPopup && <div className="popupContainer" onClick={clickHandler}>
                <Box style={popupStyle}>
                    {children}
                </Box>
            </div>}
        </> 
    )
}
