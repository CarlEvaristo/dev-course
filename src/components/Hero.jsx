import React from 'react'
import "./hero.css"
import Box from './Box'

export default function Hero() {
  const boxStyle = {
    marginRight:"-200px",
    height: "fit-content",
    width:"120%",
    zIndex: "0",
    backgroundColor: "#FDCA01",
    padding: "1rem 3rem",
  }

  return (
    <div className='hero'>
        <div className="heroText">
            <Box style={boxStyle} ratio={true}>
                <h2>Learn coding by actually coding a lot</h2>
                <p>A personal AI powered tutor. <br/>
                A practice based program. <br/>
                Over 1000 coding challenges</p>
            </Box>
        </div>

        <div className="heroImage" />
    </div>
  )
}
