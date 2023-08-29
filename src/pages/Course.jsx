import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '../components/Box'
import Ide from '../components/Editor/Ide'
import { courses } from "../course-data"
import "./course.css"

export default function Course() {
  const [isCorrect, setIsCorrect] = useState(false)
  const [output, setOutput] = useState({
    console:"",
    browser:"",
  })
  const {id} = useParams()
  const course = courses.find(item => item.id === id)

  // receive the output from the iframe through window
  useEffect(()=>{
    function handleOnMessage(event) {
      if (event.data.id === 'uniqueId1') {
        setOutput({
          console: event?.data.consolePayload[0] === undefined ? "" : event.data.consolePayload,
          browser: event?.data.browserPayload,
        });
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
    if ((course.challenges[0].solution.console === output.console[0]) &&
    (course.challenges[0].solution.browser === output.browser[0])) {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
    }
  }

  return (
    <>
        <h1 className='courseTitle'>{course.title}</h1>
        <p>{course.content}</p>
        <div className='editor-box'>
          {course.challenges.map((item, i) => {
            return (
              <Box className='challenges' style={boxStyle} key={i}>
                <div className="challengeContainer">
                  <div className="titleBox">
                    <h2>{`Challenge ${item.id}`}</h2>
                    <p>{item.challenge}</p>
                    <p style={{backgroundColor: "#f4f5f0"}}>Console goal: {item.solution.console}</p>
                    <p style={{backgroundColor: "#f4f5f0"}}>Browser goal: {item.solution.browser}</p>
                    <p style={{backgroundColor: "#f4f5f0"}}>{`Console result: ${output.console[0]}`}</p>
                    <p style={{backgroundColor: "#f4f5f0"}}>{`Browser result: ${output.browser[0]}`}</p>
                    <p style={{backgroundColor: "#f4f5f0"}}>{`You are ${isCorrect ? "correct" : "wrong"}!`}</p>
                  </div>
                  <div className="btnBox">
                    <button className='challengeBtn' onClick={clickHandler}>Check Score</button>
                    <button className='challengeBtn' disabled>Next Challenge</button>
                  </div>
                </div>

                <Ide htmlinput={item.html} css={item.css} javascript={item.javascript} browserTest={item.browserTest} />
              </Box>)
          })
          }
        </div>
    </>
  )
}
