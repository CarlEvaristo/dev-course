export default function generateSourceBrowser(srcDoc, processedJs, logErr) { 

  //can't link out of the iframe to (external) urls
  const processedHTML = srcDoc.html.replace("<a ", `<a href="javascript:void(0)" `)  

  return `
    <html>
      <style>
        ${srcDoc.css} 
      </style>
      <body style="display:flex; width:100%; overflow: hidden;">
        <div>
          ${processedHTML}
        </div>

        <script>
            let logOutputs = []
            let testOutputs = []

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
              eval(${processedJs});
            } catch(error) {
                logOutputs.push("RUNTIME " + error);
            } 
          
            try {
              ${logErr}.split(";").forEach(item => logOutputs.push(item))
            } catch(error) {}
            
            console.log = originalLog
            console.error = originalError 
            console.warn = originalWarning
            console.info = originalInfo
            console.clear = originalClear

            try {
              eval(testOutputs.push(${srcDoc.browserTest}));
            } catch(error) {
              testOutputs.push("RUNTIME TEST " + error);
            } 

            const windowMsg = {
                id: 'uniqueId1',
                consolePayload: logOutputs,
                browserPayload: testOutputs
            };

            window.top.postMessage(windowMsg, '*')

        </script>
      </body>
    </html>
  `
};