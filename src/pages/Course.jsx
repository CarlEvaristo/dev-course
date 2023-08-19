import React from 'react'
import { useParams } from 'react-router-dom'
import courseData from "../data.json"
import Ide from '../components/Editor/Ide'

export default function Course() {
  const {id} = useParams()
  
  const data = courseData.courses.find(item => item.id === id)

  return (
    <div>
        <h1>{data.title}</h1>
        <p>{data.content}</p>
        <section>
          <Ide />
        </section>
    </div>
  )
}
