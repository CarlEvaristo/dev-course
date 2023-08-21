import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { abcdef } from '@uiw/codemirror-themes-all';
import Box from '../Box';

import "./editor.css"
// npm i @uiw/react-codemirror
// npm install @uiw/codemirror-extensions-basic-setup --save
// npm i @uiw/codemirror-extensions-langs
// npm i @uiw/codemirror-themes
// npm i @uiw/codemirror-themes-all
// npm i @codemirror/lang-javascript

export default function Editor({ lang, isExpanded, setIsExpanded, setSrcDoc, isDark }) {
    const [code, setCode] = React.useState("");

    React.useEffect(()=>{
        setSrcDoc(prev => ({...prev, [lang]: code}))
    },[code, setSrcDoc, lang])

    function clickHandler() {
        setIsExpanded(lang)
    }

    return (
        <div className={`editorBox ${(isExpanded === lang) ? "expand" : "collapse"}`} onClick={clickHandler}>
            <div className="editor-header">
                <h4>{(isExpanded !== lang && lang.length > 4) ? lang.slice(0,4)+".." : lang}</h4><i className="fa-solid fa-down-left-and-up-right-to-center expandIcon"></i>
            </div>
            <CodeMirror
                value={code}
                onChange={setCode}
                width="100%"
                height="200px"
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
        </div>
        
    )
}
