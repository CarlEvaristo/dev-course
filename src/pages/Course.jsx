import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '../components/Box'
import Ide from '../components/Editor/Ide'
import Popup from '../components/Popup'
import NextButton from '../components/NextButton'
import { courses } from "../course-data"
import "./course.css"

export default function Course() {
  const [isCorrect, setIsCorrect] = useState(null)
  const [output, setOutput] = useState({
    console:"",
    browser:"",
  })
  const [showPopup, setShowPopup] = React.useState(false)

  const {courseid, challengeid} = useParams()
  const course = courses.find(item => item.id === courseid)

  // receive the output from the iframe through window
  useEffect(()=>{
    function handleOnMessage(event) {
      if (event.data.id === 'uniqueId1') {
        setOutput({
          console: event?.data.consolePayload[0] === undefined ? [""] : event.data.consolePayload,
          browser: event?.data.browserPayload,
        });
      }
    }

    window.addEventListener('message', handleOnMessage);

    return () => {
      window.removeEventListener('message', handleOnMessage);
    };
  }, []);

  function popupHandler() {
    setShowPopup(prev => !prev)
  }

  const boxStyle = {
    width:"100%",
    backgroundColor: "#E9E5E2",
    padding: "1rem",
  }

  function clickHandler() {
    if ((course.challenges[parseInt(challengeid)-1].solution.console === output.console[0]) &&
    (course.challenges[parseInt(challengeid)-1].solution.browser === output.browser[0])) {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
    }
    setShowPopup(true);
  }

  return (
    <>
        {showPopup && 
          <Popup showPopup={showPopup} clickHandler={popupHandler} color={"#51feaf"}>
            <div className='challengePopup'>
              <h3 style={{marginBottom:"1em", textAlign: "center"}}>{`${isCorrect ? "Correct, well done!" : "Wrong, no problem!"}`}</h3>
              <NextButton courseid={courseid} challengeid={challengeid} setShowPopup={setShowPopup} />
            </div>
          </Popup>
        }
        <h1 className='courseTitle'>{course.title}</h1>
        <p>{course.content}</p>
        <div className='editor-box'>
          {course.challenges.filter(item => item.id === challengeid).map((item) => {
              return <Box className='challenges' style={boxStyle} key={item.id}>
                <div className="challengeContainer">
                <div className="challengeHeader">
                    <div className="titleBox">
                      <h3>{`Challenge ${item.id}: `}</h3>
                      <h2>{item.title}</h2>
                    </div>
                    <div className="btnBox">
                      <button className='challengeBtn' onClick={clickHandler}>Check Score</button>
                    </div>
                  </div>
                  <p className='challengeText'>{item.challenge}</p>
                  <br/>
                  <p>{`expected console output: ${item.solution.console}`}</p>
                  <p>{`expected browser output: ${item.solution.browser}`}</p>
                  <p>{`your console output: ${output.console}`}</p>
                  <p>{`your browser output: ${output.browser}`}</p>
                </div>

                <Ide htmlinput={item.html} css={item.css} javascript={item.javascript} browserTest={item.browserTest} />
              </Box>
            })
          }
        </div>
    </>
  )
}
