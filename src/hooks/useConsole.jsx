import React from 'react'

export default function useConsole(jsSource) {
    const oldConsoleLog = console.log
    console.log = (arg) => arg
    try {
        return (eval(jsSource) !== undefined) ? eval(jsSource) : ""
    } catch(error) {
        return eval(error)
    }
}
