import React from 'react'
import Editor from './Editor'

import "./ide.css"

export default function Ide() {
  return (
    <div className='ide'>
        <h3>Code Editor</h3>
        <div className="pane top-pane">
          <Editor lang="html"/>
          <Editor lang="css"/>
          <Editor lang="javascript"/>
        </div>
        <div className="pane bottom-pane">
        </div>
    </div>
  )
}
