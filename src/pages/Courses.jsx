import React from 'react'
import { Link } from 'react-router-dom'
import { courses } from "../course-data"

export default function Courses() {
  return (
    <>
        <h1>Courses</h1>
        <ul>
            {courses.map(item => {
                return ( 
                    <li key={item.id}>
                        <Link 
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
