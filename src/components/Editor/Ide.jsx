import React from 'react'
import Editor from './Editor'
import Box from '../Box';
import "./ide.css"

export default function Ide() {
  const [isDark, setIsDark] = React.useState(true)
  const [isExpanded, setIsExpanded] = React.useState("html");  // 1,"html", "css", or "javascript"
  const [srcDoc, setSrcDoc] = React.useState({
    html:"<h1>test</h1>",
    css:"h1 {color: red;}",
    javascript:"",
  })

  const sourceDoc = `
    <html>
      <body>${srcDoc.html}</body>
      <style>${srcDoc.css}</style>
      <script>${srcDoc.javascript}</script>
    </html>
  `
  let boxStyle = {
    margin:"0px",
    width: "100%",
    height:"100%",
  }
  React.useEffect(()=>{
    console.log(srcDoc)
  },[srcDoc])

  return (
    <div className='ide'>
        <div className="ide-header">
          <h3>Code Editor</h3>
          <i  className={`${isDark ? "fa-regular fa-sun" : "fa-solid fa-moon"} fa-lg theme-toggle`} 
              onClick={() => setIsDark(prev=>!prev)}>
          </i>
        </div>
        <div className="pane">
          <Editor lang="html" isExpanded={isExpanded} setIsExpanded={setIsExpanded} setSrcDoc={setSrcDoc} isDark={isDark} />
          <Editor lang="css" isExpanded={isExpanded} setIsExpanded={setIsExpanded} setSrcDoc={setSrcDoc} isDark={isDark} />
          <Editor lang="javascript" isExpanded={isExpanded} setIsExpanded={setIsExpanded} setSrcDoc={setSrcDoc} isDark={isDark} />
        </div> 
        <div className="pane"> 
          <Box style={boxStyle}>
            <div className="browser-header">
              <h4>Browser</h4>
            </div>
            <iframe
              srcDoc={sourceDoc}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </Box>
        </div>
    </div>
  )
}
