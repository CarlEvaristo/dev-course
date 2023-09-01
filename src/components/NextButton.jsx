import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./next-button.css"

export default function NextButton({ courseid, challengeid, setShowPopup }) {
  const [timer, setTimer] = useState(8)
  const navigate = useNavigate()

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timer]);

  useEffect(() => {
    if (timer == 0) {
      setShowPopup(false)
      navigate(`/courses/${courseid}/${parseInt(challengeid) + 1}`) 
    }
  }, [timer]);


  return (
    <>
      <a className="button left" onClick={()=> navigate(`/courses/${courseid}/${parseInt(challengeid) + 1}`) }>
        {`Next Challenge starts in ${timer}`}
      </a>
    </>

  )
}
