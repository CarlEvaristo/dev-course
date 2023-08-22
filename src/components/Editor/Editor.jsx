import React, { useRef } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { abcdef } from '@uiw/codemirror-themes-all';
import useConsole from '../../hooks/useConsole';

import "./editor.css"

export default function Editor({ lang, isExpanded, setIsExpanded, srcDoc, setSrcDoc, isDark }) {
    const [consoleMsgs, setConsoleMsgs] = React.useState([])
    const console = useConsole(srcDoc.javascript, setConsoleMsgs)
    const rootRef = useRef();
    const [code, setCode] = React.useState(srcDoc[lang])

    React.useEffect(()=>{
        ["html", "css"].includes(lang) && setSrcDoc(prev => ({...prev, [lang]: code}))
    },[code])

    React.useEffect(()=>{
        setConsoleMsgs(prev => {
            return (console !== prev[0]) ? 
                [console, ...prev] :
                [...prev]
        })
    },[srcDoc])

    function clickHandler() {
        setSrcDoc(prev => ({...prev, [lang]: code}))
    }

    function collapseHandler() {
        setIsExpanded(lang)
    }

    return (
        <div className={`editorBox ${(isExpanded === lang) ? "expand" : "collapse"}`} onClick={collapseHandler}>
            <div className="editor-header">
                <h4>{(isExpanded !== lang && lang.length > 4) ? lang.slice(0,4)+".." : lang}</h4>
                <i className="fa-solid fa-down-left-and-up-right-to-center expandIcon"></i>
            </div>
            <div style={{position:"relative"}} useRef={rootRef}>
                <CodeMirror
                    value={code}
                    onChange={setCode}
                    width="100%"
                    height="400px"
                    extensions={
                        (lang === "html") ? [langs.html()] : 
                        (lang === "css") ? [langs.css()] : 
                        [langs.javascript()]
                    }
                    basicSetup={{
                        foldGutter: false,
                        dropCursor: false,
                        allowMultipleSelections: false,
                        indentOnInput: false,
                        autocompletion: true,
                    }}
                    theme = {(isDark) ? abcdef : bbedit}
                />
                {(lang === "javascript" && isExpanded === lang) && 
                    <div style={{position:"absolute", bottom:"0", width:"100%", color: isDark ? "white" : "black"}}>
                        <div className="consoleHeader">
                            <h4>Console</h4>
                            <button className='consoleBtn' onClick={clickHandler}>RUN</button>
                        </div>
                        <ul style={{height:"80px", padding:"0 .5em", overflowY:"scroll", fontFamily: "monospace",}}>
                            {consoleMsgs.map(item => <li style={{paddingLeft:"1rem"}}>{`> ${item}`}</li>)}
                        </ul>
                    </div>
                }
            </div>

        </div>
        
    )
}
