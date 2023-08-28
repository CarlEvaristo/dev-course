// transpile.js
const babelOptions = {
    presets: [ "react", ["es2015", { "modules": false }]]
  }
  
function preprocess(str) {
  const babelObject = Babel.transform(str, babelOptions);
  return babelObject.code
}

export default preprocess