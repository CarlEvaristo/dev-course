export default function generateSourceBrowser(srcDoc) { 

  //prevent links from iframe to (external) urls
  const processedHTML = srcDoc.html.replace("<a ", `<a href="javascript:void(0)" `)  

  return `
    <html >
      <head>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      </head>
      <style>
        ${srcDoc.css} 
      </style>
      
      <body style="display:flex; width:100%; overflow: hidden;">
        <div>
          ${processedHTML}
        </div>

        <script type="text/javascript">
          let logOutputs = []
          let testOutputs = []
          
          const originalLog = console.log
          const originalError = console.error;
          const originalWarning = console.warn;
          const originalInfo = console.info;
          const originalClear = console.clear;

          console.log = (...args) => logOutputs.push(...args)
          console.error = (error) => logOutputs = [error]
          console.warn = (...args) => logOutputs.push(...args)
          console.info = (...args) => logOutputs.push(...args)
          console.clear = (...args) => logOutputs.push(...args)
        </script>

        <script type="text/javascript">
          const babelOptions = {
            presets: [ "react", ["es2015", { "modules": false }]]
          };
          
          function preprocess(str) {
            try {
              const babelObject = Babel.transform(str, babelOptions);
              return babelObject.code;
            } catch (error) {
              logOutputs.push(error)
            }
          }

          try {
            const code = preprocess(\`${srcDoc.javascript}\`); 
            eval(code);
          } catch (error) {
            logOutputs.push(error)
          }
        </script>

        <script>
          let browserOut
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              try {
                browserOut = ${srcDoc.browserTest}
                testOutputs = [browserOut];
              } catch(error) {
                testOutputs = [error];
              } 

              const windowMsg = {
                id: 'uniqueId1',
                consolePayload: logOutputs,
                browserPayload: testOutputs
              };
            
              window.top.postMessage(windowMsg, '*')
            });
          });
          
          const config = { attributes: true, childList: true, characterData: true, subtree: true };

          observer.observe(document.body, config);

          console.log = originalLog
          console.error = originalError 
          console.warn = originalWarning
          console.info = originalInfo
          console.clear = originalClear

        </script>
      </body>
    </html>
  `
  };