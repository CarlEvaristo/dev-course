import React from 'react'
import "./hero.css"
import Box from './Box'

export default function Hero() {
  const boxStyle = {
    width: "40vw",
    zIndex: "0",
  }

  return (
    <div className='hero'>
        <div className="heroText">
            <Box style={boxStyle}>
                <h2>Learn coding by actually coding a lot</h2>
                <p>A personal AI powered tutor. <br/>
                A practice based program. <br/>
                Over 1000 coding challenges</p>
            </Box>
        </div>

        <div className="heroImage">
            <img src={"/images/cat-typing.gif"} alt="cat slamming on keyboard like a true dev"/>
        </div>
    </div>
  )
}
