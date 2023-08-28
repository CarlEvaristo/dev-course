import React from 'react'
import { useParams } from 'react-router-dom'
import Box from '../components/Box'
import Ide from '../components/Editor/Ide'
import { courses } from "../data"
import "./course.css"

export default function Course() {
  const {id} = useParams()
  const course = courses.find(item => item.id === id)
  const boxStyle = {
    width:"100%",
    backgroundColor: "#E9E5E2",
    padding: "1rem",
  }

  return (
    <>
        <h1>{course.title}</h1>
        <p>{course.content}</p>
        <div className='editor-box'>
          {course.challenges.map((item, i) => {
            return (
              <Box className='challenges' style={boxStyle} key={i}>
                <h1>{`Challenge ${item.id}`}</h1>
                <p>{item.challenge}</p>
                <Ide htmlinput={item.html} css={item.css} javascript={item.javascript}/>
              </Box>)
          })
          }
        </div>
    </>
  )
}
