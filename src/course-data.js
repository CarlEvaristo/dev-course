const minify = it => it.replace('                  ', ' ')

export const courses = [
{
"id": "1",
"title": "Web dev basics",
"content": "The absolute beginners HTML and CSS basics. Make basic layouts and style them.",
"pro": false,
"challenges":[
    {
        id: "1",
        title: "Hello World!",
        challenge: `The following function doesn't return anything, please tweak the javascript code to make it work. \nThe desired outcome is when the h1 title reads 'Hello world!'`,
        html: "<h1>Hello </h1>",
        css:"h1 {\n  color: grey;\n}",
        javascript: `function returnGreet() {\n  const title = document.getElementsByTagName("h1")[0];\n  title.textContent += arg;\n};\nreturnGreet("world!");`,
        browserTest: `(() => document.getElementsByTagName("h1")[0].textContent)()`,
        solution: {
            browser:"Hello world!",
            console: "",
        }
    },
    {
        id: "2",
        title: "Hello Galaxy!",
        challenge: `The following function doesn't return anything, please tweak the javascript code to make it work. \nThe desired outcome is when the h1 title reads 'Hello galaxy!'`,
        html:`<div class="container">
    <div class="moon">
        <div class="crater crater1"></div>
        <div class="crater crater2"></div>
        <div class="crater crater3"></div>
        <div class="crater crater4"></div>
        <div class="crater crater5"></div>
        <div class="shadow"></div>
        <div class="eye eye-l"></div>
        <div class="eye eye-r"></div>
        <div class="mouth"></div>
        <div class="blush blush1"></div>
        <div class="blush blush2"></div>
    </div>
    <div class="orbit">
        <div class="rocket">
            <div class="window"></div>
        </div>
    </div>
</div>`
        ,
        css:`body {
    background-color: #151845;
    padding: 0;
    margin: 0;
}
.container {
    height: 370px;
    width: 370px;
    /* border: 1px solid #fff; */
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.moon {
    background-color: #39beff;
    height: 170px;
    width: 170px;
    border-radius: 50%;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
}
.crater {
    background-color: #31b4ff;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    position: relative;
}
.crater:before {
    content: "";
    position: absolute;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    box-shadow: -5px 0 0 2px #1ca4f9;
    top: 2px;
    left: 7px;
}
.crater1 {
    top: 27px;
    left: 90px;
    transform: scale(0.9);
}
.crater2 {
    bottom: 15px;
    left: 61px;
    transform: scale(0.6);
}
.crater3 {
    left: 15px;
    transform: scale(0.75);
}
.crater4 {
    left: 107px;
    top: 32px;
    transform: scale(1.18);
}
.crater5 {
    left: 33px;
    bottom: 4px;
    transform: scale(0.65);
}
.shadow {
    height: 190px;
    width: 190px;
    box-shadow: 21px 0 0 5px rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    position: relative;
    bottom: 157.5px;
    right: 46px;
}
.eye {
    background-color: #161616;
    height: 12px;
    width: 12px;
    position: relative;
    border-radius: 50%;
}
.eye-l {
    bottom: 255px;
    left: 59px;
}
.eye-r {
    bottom: 267px;
    left: 101px;
}
.mouth {
    height: 5px;
    width: 10px;
    border: 3px solid #161616;
    position: relative;
    bottom: 262px;
    left: 79px;
    border-top: none;
    border-radius: 0 0 10px 10px;
}
.blush {
    background-color: #1ca4f9;
    height: 7.5px;
    width: 7.5px;
    position: relative;
    border-radius: 50%;
}
.blush1 {
    bottom: 273px;
    left: 50px;
}
.blush2 {
    bottom: 281px;
    left: 115px;
}
.orbit {
    height: 280px;
    width: 280px;
    /* border: 1px solid #fff; */
    border-radius: 50%;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    animation: spin 10s infinite linear;
}
@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

.rocket {
    background-color: #fafcf7;
    height: 50px;
    width: 25px;
    border-radius: 50% 50% 0 0;
    position: relative;
    left: -11px;
    top: 115px;
}
.rocket:before {
    content: "";
    position: absolute;
    background-color: #39beff;
    height: 20px;
    width: 55px;
    border-radius: 50% 50% 0 0;
    z-index: -1;
    right: -15px;
    bottom: 0;
}
.rocket:after {
    content: "";
    position: absolute;
    background-color: #39beff;
    height: 4px;
    width: 15px;
    border-radius: 0 0 2px 2px;
    bottom: -4px;
    left: 4.3px;
}
.window {
    background-color: #151845;
    height: 10px;
    width: 10px;
    border: 2px solid #b8d2ec;
    border-radius: 50%;
    position: relative;
    top: 17px;
    left: 5px;
}`
                ,
                javascript: ``,
                browserTest: ``,
                solution: {
                    browser:"",
                    console: "",
                }
            },
        ],
    },
    {
        "id": "2",
        "title": "CSS basics",
        "content": "Must go faster... go, go, go, go, go! We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe if we screw up this planet enough, they won't want it anymore! Yes, Yes, without the oops! Yeah, but John, if The Pirates of the Caribbean breaks down, the pirates don’t eat the tourists.",
        "pro": true,
        "challenges": [],
    },
]
