import React from 'react'
import Editor from './Editor'
import Box from '../Box';
// import CustomConsole from './CustomConsole';

import "./ide.css"

export default function Ide({ htmlinput, css, javascript }) {
  const [isDark, setIsDark] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState("html");  // 1,"html", "css", or "javascript"
  const [browser, setBrowser] = React.useState("small"); 
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
    height: "100%",
  }

  return (
    <div className='ide'>
        <div className="ide-header">
          <i  className={`${isDark ? "fa-regular fa-sun" : "fa-solid fa-moon"} fa-lg theme-toggle`} 
              onClick={() => setIsDark(prev=>!prev)}>
          </i>
        </div>
        <div className="pane">
          <Editor lang="html" isExpanded={isExpanded} setIsExpanded={setIsExpanded} srcDoc={srcDoc} setSrcDoc={setSrcDoc} isDark={isDark} color="#B087FD" />
          <Editor lang="css" isExpanded={isExpanded} setIsExpanded={setIsExpanded} srcDoc={srcDoc} setSrcDoc={setSrcDoc} isDark={isDark} color="#FDCA01" />
          <Editor lang="javascript" isExpanded={isExpanded} setIsExpanded={setIsExpanded} srcDoc={srcDoc} setSrcDoc={setSrcDoc} isDark={isDark} color="#FF704E" />
        </div> 
        <div className="pane"> 
          <Box style={boxStyle}>
            <div className="browser-header" style={{backgroundColor: "#F4F5F0"}}>
              <h4>browser</h4>
              <div className='browserBtns'>
                <span className="dot" style={{backgroundColor: "#B087FD"}} onClick={()=>setBrowser("open")} ></span>
                <span className="dot" style={{backgroundColor: "#FDCA01"}} onClick={()=>setBrowser("small")} ></span>
                <span className="dot" style={{backgroundColor: "#FF704E"}} onClick={()=>setBrowser("closed")} ></span>
              </div>
            </div>
            {(["open","small"].includes(browser)) && <iframe
              srcDoc={sourceBrowser}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height={(browser === "open") ? "500px" : "200px"}
            />}
          </Box>
        </div>
    </div>
  )
}
