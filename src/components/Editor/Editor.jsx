import React, { useRef } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { abcdef } from '@uiw/codemirror-themes-all';
import useConsole from '../../hooks/useConsole';

import "./editor.css"

export default function Editor({ lang, isExpanded, setIsExpanded, srcDoc, setSrcDoc, isDark, color }) {
    const [consoleMsgs, setConsoleMsgs] = React.useState([])
    const console = useConsole(srcDoc.javascript, setConsoleMsgs)
    const rootRef = useRef();
    const [code, setCode] = React.useState(srcDoc[lang])

    React.useEffect(()=>{
        ["html", "css"].includes(lang) && setSrcDoc(prev => ({...prev, [lang]: code}))
    },[code, lang, setSrcDoc])

    React.useEffect(()=>{
        setConsoleMsgs(prev => {
            return (console !== prev[0]) ? 
                [...prev, console] :
                [...prev]
        })
    },[srcDoc, console])

    function clickHandler() {
        setSrcDoc(prev => ({...prev, [lang]: code}))
    }

    function collapseHandler() {
        setIsExpanded(lang)
    }

    return (
        <div className={`editorBox ${(isExpanded === lang) ? "expand" : "collapse"}`} onClick={collapseHandler}>
            <div className="editor-header" style={{backgroundColor: color}}>
                <h4 style={{overflow:"hidden", marginRight:"20px"}}>{lang}</h4>
                <i className="fa-solid fa-down-left-and-up-right-to-center expandIcon"></i>
            </div>
            <div className='consoleContainer' useRef={rootRef}>
                <CodeMirror
                    value={code}
                    onChange={setCode}
                    width="100%"
                    height={(lang === "javascript") ? "190px" : "300px"}
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
                    <div style={{color: isDark ? "white" : "black", backgroundColor: isDark ? "#0f0f0f" : "white"}} className="consoleClass">
                        <div className="consoleHeader">
                            <h4>console</h4>
                            <button className='consoleBtn' onClick={clickHandler}>RUN</button>
                        </div>
                        <ul style={{height:"70px", overflow:"scroll", fontFamily: "monospace",}}>
                            {consoleMsgs.map((item,i) => {
                                return (
                                    <li key={i} style={{paddingLeft:".5rem"}}>
                                        {`> ${item}`}
                                    </li>)
                                })}
                        </ul>
                    </div>
                }
            </div>

        </div>
        
    )
}
