import React from 'react'
import Editor from './Editor'
import Box from '../Box';
import preprocess from './transpiler';
import styles from "./browser.module.css"
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

  let processedJs;
  let logErr;

  // Why I use Babel standalone compiler/preprocessor? Readme for info.
  try {
    processedJs = preprocess(srcDoc.javascript)  
    processedJs = `'${processedJs}'`.replace(/\n/g, ';');
  } catch(error) {
    logErr = `'${error}'`.replace(/\n/g, ';')
  }
  
  const sourceBrowser = `
    <html>
      <style>
        ${srcDoc.css}
        .browserContainer {
          flex: 6;
        }
        .consoleContainer {
          flex: 4;
        }
        body {
          flex-direction:row; 
        }
        @media (max-width:1000px) {
          body {
              flex-direction: column;
          }
          .consoleContainer {
            flex: 4;
            border-top: 2px solid black;
          }
        }

      </style>
      <body style="overflow: hidden; display:flex; width:100%; height:100vh; margin: 0; padding:0;">
        <div class="browserContainer" style="width:100%; overflow-y:scroll; ">
          ${srcDoc.html}
        </div>

        <div class="consoleContainer" style="width:100%; margin: 0; padding: 0;  z-index: 100000; overflow-y: scroll; background-color: white;">
          <div style="position: absolute; top: auto; width: 100%; display: flex; align-items: center; padding: .5rem; background-color: #F4F5F0; font-family: 'Roboto', sans-serif; font-size: 1rem; font-weight: bold;">
            console
          </div>
          <ul id="consoleList" style="margin: 3rem 1rem 1rem; padding: 0; overflow: hidden; font-family: 'Courier'; font-size: .8rem; list-style-type: none;" ></ul>
        </div>
        <script>
          

            let logOutputs = []
            const originalLog = console.log
            const originalError = console.error;
            const originalWarning = console.warn;
            const originalInfo = console.info;
            const originalClear = console.clear;

            console.log = (...args) => logOutputs.push(...args)
            console.error = (error) => logOutputs.push(error.toString() + error.stack)
            console.warn = (...args) => logOutputs.push(...args)
            console.info = (...args) => logOutputs.push(...args)
            console.clear = (...args) => logOutputs.push(...args)

            try {
              new Function(${processedJs})();
            } catch(error) {} //escaped catch block, i have custom error handling below
          
            try {
              ${logErr}.split(";").forEach(item => logOutputs.push(item))
            } catch(error) {}
            
            console.log = originalLog
            console.error = originalError 
            console.warn = originalWarning
            console.info = originalInfo
            console.clear = originalClear

            const myList = document.getElementById('consoleList');
            logOutputs.forEach(item => {
                const listItem = document.createElement('li');
                const preElement = document.createElement('pre');
                preElement.textContent = '>  ' + item;
                listItem.appendChild(preElement);
                preElement.style.margin = '.2em 0';
                myList.appendChild(listItem);
            });
      

        </script>
      </body>
    </html>
  `

  let boxStyle = {
    margin:"0px",
    padding:"0px",
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
              frameBorder="0"
              width="100%"
              height={(browser === "open") ? "800px" : "400px"}
            />}
          </Box>
        </div>
    </div>
  )
}
