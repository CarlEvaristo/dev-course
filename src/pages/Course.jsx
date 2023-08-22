import React from 'react'
import { useParams } from 'react-router-dom'
import Box from '../components/Box'
import { courseData } from "../course-data"
import "./course.css"
import Ide from '../components/Editor/Ide'

export default function Course() {
  const {id} = useParams()
  const course = courseData.find(item => item.id === id)

  const boxStyle = {
    width:"100%",
    backgroundColor: "#FDCA01",
    padding: "1rem",
  }

  return (
    <>
        <h1>{course.title}</h1>
        <p>{course.content}</p>
        <>
          {course.challenges.map(item => {
            return (
              <Box className='challenges' style={boxStyle}>
                <h1>{`Challenge ${item.id}`}</h1>
                <p>{item.challenge}</p>
                <Ide htmlinput={item.html} css={item.css} javascript={item.javascript}/>
              </Box>)
          })
          }
        </>
    </>
  )
}
