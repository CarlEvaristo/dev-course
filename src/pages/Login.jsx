import React from 'react'
import Box from '../components/Box'

export default function Login() {
  const boxStyle = {
    width: "40vw",
    zIndex: "0",
    backgroundColor: "red",
    padding: "1rem",
  }

  return (
    <>
      <h1>Login</h1>
      <Box style={boxStyle}/>
    </>
  )
}
