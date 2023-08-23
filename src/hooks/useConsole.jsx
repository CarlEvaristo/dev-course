export default function useConsole(jsSource) {
    console.log = (arg) => arg
    try {
        return (eval(jsSource) !== undefined) ? eval(jsSource) : ""
    } catch(error) {
        return eval(error)
    }
}
