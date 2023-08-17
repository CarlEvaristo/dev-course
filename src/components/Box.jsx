import React from 'react'
import "./box.css"

export default function Box(props) {
  return (
    <div
        className='box-shadow'
        style={props.style}
    >
        {props.children}
    </div>
  )
}
