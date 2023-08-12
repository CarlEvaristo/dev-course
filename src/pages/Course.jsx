import React from 'react'
import { useParams } from 'react-router-dom'

import courseData from "../data.json"

export default function Course() {
  const {id} = useParams()
  
  const data = courseData.courses.find(item => item.id === id)

  return (
    <div>
        <h1>{data.title}</h1>
        <p>{data.content}</p>
    </div>
  )
}
