import { useState, useMemo } from 'react'
import Editor from './Editor'
import Box from '../Box';
import preprocess from './transpiler';
import generateSourceBrowser from './iframe';
import "./ide.css"

export default function Ide({ htmlinput, css, javascript, browserTest }) {
  const [isDark, setIsDark] = useState(false)
  const [isExpanded, setIsExpanded] = useState("html");  // 1,"html", "css", or "javascript"
  const [browser, setBrowser] = useState("small"); 
  const [srcDoc, setSrcDoc] = useState({
    html: htmlinput,
    css:css,
    javascript: javascript,
    browserTest: browserTest,
  })
  console.log(`
    <html>
      <style>
        ${srcDoc.css}
      </style>
      <body> 
        ${srcDoc.html}
      </body>
    </html>
  `)

  // Why I use Babel standalone compiler/preprocessor? Readme for info.
  const [processedJs, logErr] = useMemo(() => {
    try {
      const js = preprocess(srcDoc.javascript);
      return [`'${js}'`.replace(/\n/g, ';'), null];
    } catch (error) {
      return [null, `'COMPILE ${error}'`.replace(/\n/g, ';')]; // COMPILE ERROR
    } 
  }, [srcDoc.javascript]);
  
  const sourceBrowser = useMemo(() => generateSourceBrowser(srcDoc, processedJs, logErr), [srcDoc, processedJs, logErr]);

  let boxStyle = {
    margin:"0px",
    padding:"0px",
    width: "100%",
    height: "100%",
  }

  return (
    <div className='ide'>
        <div className="ide-header">
          <i  className={`${isDark ? "fa-regular fa-moon" : "fa-solid fa-moon"} fa-lg theme-toggle`} 
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
            <div className="browser-header">
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
              sandbox="allow-modals allow-scripts"
              frameBorder="nul"
              width="100%"
              height={(browser === "open") ? "800px" : "400px"}
            />}
          </Box>
        </div>
    </div>
  )
}
