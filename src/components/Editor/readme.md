# Custom code editor

I had to build my own browser/console output for the editor.
Console to print console logs, errors, etc. Is important for this usecase, I use
this output to check users' code assignments.

The editor input windows are made using the codeMirror library.
This is also used in the console/ code editor in Chrome and other browsers.
Also codepen.io is based on this library.
Running a code editor can cause security issues, like code injection.

To lower the security risk I:

- moved the entire code-running code inside an iframe.
- used new Function()() instead of eval to run the code.
- used Babel runtime compiler to catch detailed error messages.

# Why Babel preprocessor/ transpiler?

I wasn't able to catch errors at runtime using eval within the browser
since eval executes code dynamically and errors out if the syntax is incorrect.

So I had to run some kind of syntax check before running eval.
One such option is using a parser like Babel.

I choose Babel not because it is the most popular transpiler
but because it offers a client-side standalone processing.

This means that I can import babel.js in my iframe
and am able to compile code on the fly at runtime.
more info: https://babeljs.io/docs/babel-standalone

I put the script tag on the index html page:

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</body>

Safe cross orign way to send data from iframe window to parent window:

- window.top.postMessage method
- window.onmessage method
