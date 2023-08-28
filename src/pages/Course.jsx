import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '../components/Box'
import Ide from '../components/Editor/Ide'
import { courses } from "../data"
import "./course.css"

export default function Course() {
  const [isFinished, setIsFinished] = useState(false)
  const [output, setOutput] = useState("")
  const {id} = useParams()
  const course = courses.find(item => item.id === id)

  // receive the output from the iframe through window
  useEffect(()=>{
    function handleOnMessage(event) {
      if (event.data.id === 'uniqueId1') {
        setOutput(event?.data.payload);
      }
    }

    window.addEventListener('message', handleOnMessage);

    return () => {
      window.removeEventListener('message', handleOnMessage);
    };
  }, []);

  const boxStyle = {
    width:"100%",
    backgroundColor: "#E9E5E2",
    padding: "1rem",
  }

  function clickHandler() {
    setIsFinished(true)
  }

  return (
    <>
        <h1>{course.title}</h1>
        <p>{course.content}</p>
        <div className='editor-box'>
          {course.challenges.map((item, i) => {
            return (
              <Box className='challenges' style={boxStyle} key={i}>
                <div className="challengeContainer">
                  <div className="titleBox">
                    <h1>{`Challenge ${item.id}`}</h1>
                    <p>{item.challenge}</p>
                    <p style={{backgroundColor: "yellow"}}>{isFinished ? `${output}` : "-"}</p>
                  </div>
                  <div className="btnBox">
                    <button className='challengeBtn' onClick={clickHandler}>Check Score</button>
                    <button className='challengeBtn' disabled>Next Challenge</button>
                  </div>
                </div>

                <Ide htmlinput={item.html} css={item.css} javascript={item.javascript}/>
              </Box>)
          })
          }
        </div>
    </>
  )
}
