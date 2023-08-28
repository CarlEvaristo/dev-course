export default function generateSourceBrowser(srcDoc, processedJs, logErr) { return `
<html>
  <style>
    ${srcDoc.css}
    .browserContainer {
      flex: 6;
    }
    .consoleContainer {
      flex: 4;
      border-left: 2px solid black;
    }
    body {
      flex-direction:row; 
    }
    @media (max-width:1000px) {
      body {
          flex-direction: column;
      }
      .consoleContainer {
        flex: 4;
        border-top: 2px solid black;
        border-left: none;

      }
    }

  </style>
  <body style="overflow: hidden; display:flex; width:100%; height:100vh; margin: 0; padding:0;">
    <div class="browserContainer" style="width:100%; overflow-y:scroll; ">
      ${srcDoc.html}
    </div>

    <div class="consoleContainer" style="width:100%; margin: 0; padding: 0;  z-index: 100000; overflow-y: scroll; background-color: white;">
      <div style="position: absolute; top: auto; width: 100%; display: flex; align-items: center; padding: .5rem; background-color: #F4F5F0; font-family: 'Roboto', sans-serif; font-size: 1rem; font-weight: bold;">
        console
      </div>
      <ul id="consoleList" style="margin: 3rem 1rem 1rem; padding: 0; overflow: hidden; font-family: 'Courier'; font-size: .8rem; list-style-type: none;" ></ul>
    </div>
    <script>
      

        let logOutputs = []
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

        const myList = document.getElementById('consoleList');
        logOutputs.forEach(item => {
            const listItem = document.createElement('li');
            const preElement = document.createElement('pre');
            preElement.textContent = '>  ' + item;
            listItem.appendChild(preElement);
            preElement.style.margin = '.2em 0';
            myList.appendChild(listItem);
        });
        
        const windowMsg = {
            id: 'uniqueId1',
            payload: logOutputs
        };

        window.top.postMessage(windowMsg, '*')

    </script>
  </body>
</html>
`
};