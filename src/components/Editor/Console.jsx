import React, { useEffect, useState } from 'react'
import "./console.css"

export default function Console({ expandBrowser, setExpandBrowser, isDark }) {
    const [output, setOutput] = useState([])

    useEffect(()=>{
        function handleOnMessage(event) {
            if (event.data.id === 'uniqueId1') {
                setOutput(event.data.consolePayload)
            }
        }

        window.addEventListener('message', handleOnMessage);
    
        return () => {
          window.removeEventListener('message', handleOnMessage);
        };
    }, []);

    return (
        <div className={`consoleContainer ${(expandBrowser === "console") ? "expandConsole" : "collapseConsole"} ${isDark ? "darkMode" : "lightMode"}`} onClick={()=>setExpandBrowser("console")} >
            <div className="consoleHeader">
                <h4 style={{overflow:"hidden", marginRight:"20px"}}>console</h4>
            </div>
            <ul className="consoleList">
                {output.map((item,i) => <li key={i}><span style={{ whiteSpace: 'pre' }} >{`> ${item}`}</span></li>)}
            </ul>
        </div>
    )
    }
    