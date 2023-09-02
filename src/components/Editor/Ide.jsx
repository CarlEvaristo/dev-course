import { useState } from 'react'
import Editor from './Editor'
import Browser from './Browser';
import Console from './Console';
import "./ide.css"

export default function Ide({ htmlinput, css, javascript, browserTest }) {
  const [isDark, setIsDark] = useState(false)
  const [isExpanded, setIsExpanded] = useState("html");  // "html", "css", or "javascript"
  const [expandBrowser, setExpandBrowser] = useState("browser");  // "browser" or "console"
  const [browserSize, setBrowserSize] = useState("small"); 

  const [srcDoc, setSrcDoc] = useState({
    html: htmlinput,
    css:css,
    javascript: javascript,
    browserTest: browserTest,
  })

  return (
    <div className='ide'>
        <div className="ide-header">
          <i  className={`${isDark ? "fa-regular fa-moon" : "fa-solid fa-moon"} fa-lg theme-toggle`} 
              onClick={() => setIsDark(prev=>!prev)}>
          </i>
        </div>
        <div className="pane" >
          <Editor lang="html" isExpanded={isExpanded} setIsExpanded={setIsExpanded} srcDoc={srcDoc} setSrcDoc={setSrcDoc} isDark={isDark} color="#B087FD" />
          <Editor lang="css" isExpanded={isExpanded} setIsExpanded={setIsExpanded} srcDoc={srcDoc} setSrcDoc={setSrcDoc} isDark={isDark} color="#FDCA01" />
          <Editor lang="javascript" isExpanded={isExpanded} setIsExpanded={setIsExpanded} srcDoc={srcDoc} setSrcDoc={setSrcDoc} isDark={isDark} color="#FF704E" />
        </div> 
        <div className="pane" style={{height: ((browserSize === "open") && "700px") || ((browserSize === "small") && "400px") || ((browserSize === "closed") && "60px")}}> 
          <Browser srcDoc={srcDoc} expandBrowser={expandBrowser} setExpandBrowser={setExpandBrowser} browserSize={browserSize} setBrowserSize={setBrowserSize} />
          <Console expandBrowser={expandBrowser} setExpandBrowser={setExpandBrowser} isDark={isDark} />
        </div>
    </div>
  )
}
