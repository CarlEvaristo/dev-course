import React from 'react'
import { Link } from 'react-router-dom'

import courseData from "../data.json"

export default function Courses() {
  return (
    <>
        <h1>Courses</h1>
        <ul>
            {courseData.courses.map(item => {
                return ( 
                    <li>
                        <Link 
                            key={item.id}
                            to={`/courses/${item.id}`}
                        >
                            {item.title}
                        </Link>
                    </li>
                )
                })}
        </ul>
    </>
  )
}
