import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { abcdef } from '@uiw/codemirror-themes-all';
import "./editor.css"

export default function Editor({ lang, isExpanded, setIsExpanded, srcDoc, setSrcDoc, isDark, color }) {
    const [code, setCode] = React.useState(srcDoc[lang])

    React.useEffect(()=>{
        setSrcDoc(prev => ({...prev, [lang]: code}))
    },[code])

    function collapseHandler() {
        setIsExpanded(lang)
    }

    return (
        <div className={`editorBox ${(isExpanded === lang) ? "expand" : "collapse"}`} onClick={collapseHandler}>
            <div className="editor-header" style={{backgroundColor: color}}>
                <h4 style={{overflow:"hidden", marginRight:"20px"}}>{lang}</h4>
                <i className="fa-solid fa-down-left-and-up-right-to-center expandIcon"></i>
            </div>
            
            <div className='editorContainer'>
                <CodeMirror
                    value={code}
                    onChange={setCode}
                    width="100%"
                    height="300px"
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

        </div>
        
    )
}
