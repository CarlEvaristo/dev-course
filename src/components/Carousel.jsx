import React from 'react'
import { NavLink } from 'react-router-dom';

import Box from './Box'
import Popup from './Popup';

import "./carousel.css"
import { courses } from "../course-data"

export default function Carousel() {
    const [scrolledStep, setScrolledStep] = React.useState(0);
    const numItems = courses.length
    const visibleItems = 3
    const containerWidth = 250

    const [showPopup, setShowPopup] = React.useState(false)

    function popupHandler() {
        setShowPopup(prev => !prev)
    }

    const inactiveCourse = {
        margin: "1rem 0",
        width: `${containerWidth}px`,
        aspectRatio: "1",
        backgroundColor: "#c1c2be",
        color:"#767674",
        padding: "1rem",
    }

    const activeCourse = {...inactiveCourse, backgroundColor: "#fff"}

    const handleClick = (direction) => {
        (direction === "left") ? setScrolledStep(prev => prev - 1) : setScrolledStep(prev => prev + 1)
    }

    return (
        <>
            {showPopup && 
                <Popup showPopup={showPopup} clickHandler={popupHandler}>
                    <p>Please login for free to get access to all the courses.</p>
                    <NavLink to="/login">
                        <h2>Join Today!</h2>
                    </NavLink>
                </Popup>
            }
            <section className={`carousel fadeSide ${(scrolledStep > 0) && "fadeLeft"}`} >
                    <div className="sideScroll" style={{marginLeft:`${(-1 * scrolledStep * containerWidth)}px`, transition: "margin-left .5s ease-in-out",}}>
                        {courses.map(item => {
                            return (!item.pro) ?
                                <NavLink to={`/courses/${item.id}`} key={item.id}>
                                    <Box style={activeCourse}>
                                        <h2>{item.title}</h2>
                                    </Box>
                                </NavLink>:
                                <div onClick={popupHandler} key={item.id}> 
                                    <Box style={inactiveCourse}>
                                        <h2>{item.title}</h2>
                                    </Box>
                                </div>
                        })}
                    </div>
                    {((numItems - scrolledStep) > visibleItems) && <div className='sideScrollBtn' onClick={()=>handleClick("right")} >
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>}
                    {(scrolledStep > 0) && <div className='sideScrollBtn leftBtn' onClick={()=>handleClick("left")} >
                        <i className="fa-solid fa-chevron-left"></i>
                    </div>}

            </section>
        </>
    )
}
