import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { nord } from '@uiw/codemirror-theme-nord';
import Box from '../Box';

import "./editor.css"
// npm i @uiw/react-codemirror
// npm install @uiw/codemirror-extensions-basic-setup --save
// npm i @uiw/codemirror-extensions-langs
// npm i @uiw/codemirror-themes
// npm i @uiw/codemirror-themes-all
// npm i @codemirror/lang-javascript

export default function Editor({ lang }) {
    const [isExpanded, setIsExpanded] = React.useState(true)

    const languages = {
        "html": [langs.html()],
        "css": [langs.css()],
        "javascript": [langs.javascript()],
    }

    let boxStyle = {
        padding: "0",
        width: isExpanded ? "100%" : "40%",
    }

    function clickHandler() {
        setIsExpanded(prev => !prev)
    }

    return (
        <Box style={boxStyle}>
            <div className="editor-header">
                <h2>{lang}</h2><i class="fa-solid fa-down-left-and-up-right-to-center" onClick={clickHandler}></i>
            </div>
            <CodeMirror
                value=""
                height="200px"
                extensions={languages[lang]}
                basicSetup={{
                    foldGutter: false,
                    dropCursor: false,
                    allowMultipleSelections: false,
                    indentOnInput: false,
                }}
            />
        </Box>
        
    )
}
