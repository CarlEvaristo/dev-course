import React, { useMemo } from 'react'
import preprocess from './transpiler';
import generateSourceBrowser from './iframe';
import "./browser.css"

export default function Browser({ srcDoc, expandBrowser, setExpandBrowser, browserSize, setBrowserSize }) {
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

    return (
        <div className={`browser-container ${(expandBrowser === "browser") ? "expandBrowser" : "collapseBrowser"}`} onClick={()=>setExpandBrowser("browser")}>
            <div className="browser-header">
            <h4>browser</h4>
            <div className='browserBtns'>
                <span className="dot" style={{backgroundColor: "#B087FD"}} onClick={()=>setBrowserSize("open")} ></span>
                <span className="dot" style={{backgroundColor: "#FDCA01"}} onClick={()=>setBrowserSize("small")} ></span>
                <span className="dot" style={{backgroundColor: "#FF704E"}} onClick={()=>setBrowserSize("closed")} ></span>
            </div>
            </div>
            {(["open", "small"].includes(browserSize)) && <iframe
            srcDoc={sourceBrowser}
            title="output"
            sandbox="allow-modals allow-scripts"
            frameBorder="nul"
            width="100%"
            height="100%"
            style={{display: "block"}}
            />}
        </div>
    )
}
