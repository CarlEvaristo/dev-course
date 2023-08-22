import React from 'react'
import Editor from './Editor'
import Box from '../Box';
// import CustomConsole from './CustomConsole';

import "./ide.css"

export default function Ide({ htmlinput, css, javascript }) {
  const [isDark, setIsDark] = React.useState(true)
  const [isExpanded, setIsExpanded] = React.useState("html");  // 1,"html", "css", or "javascript"
  
  const [srcDoc, setSrcDoc] = React.useState({
    html: htmlinput,
    css:css,
    javascript: javascript,
  })

  const sourceBrowser = `
    <html>
      <body>${srcDoc.html}<script>${srcDoc.javascript}</script></body>
      <style>${srcDoc.css}</style>
      
    </html>
  `

  let boxStyle = {
    margin:"0px",
    width: "100%",
    height:"100%",
  }

  return (
    <div className='ide'>
        <div className="ide-header">
          <h3>Code Editor</h3>
          <i  className={`${isDark ? "fa-regular fa-sun" : "fa-solid fa-moon"} fa-lg theme-toggle`} 
              onClick={() => setIsDark(prev=>!prev)}>
          </i>
        </div>
        <div className="pane">
          <Editor lang="html" isExpanded={isExpanded} setIsExpanded={setIsExpanded} srcDoc={srcDoc} setSrcDoc={setSrcDoc} isDark={isDark} />
          <Editor lang="css" isExpanded={isExpanded} setIsExpanded={setIsExpanded} srcDoc={srcDoc} setSrcDoc={setSrcDoc} isDark={isDark} />
          <Editor lang="javascript" isExpanded={isExpanded} setIsExpanded={setIsExpanded} srcDoc={srcDoc} setSrcDoc={setSrcDoc} isDark={isDark} />
        </div> 
        <div className="pane"> 
          <Box style={boxStyle}>
            <div className="browser-header">
              <h4>Browser</h4>
            </div>
            <iframe
              srcDoc={sourceBrowser}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
            {/* <CustomConsole jsSource={sourceConsole} /> */}
          </Box>
        </div>
    </div>
  )
}
