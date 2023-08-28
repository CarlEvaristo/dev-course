export const courseData = [
    {
        "id": "0001",
        "title": "Web dev basics",
        "content": "Life finds a way. God creates dinosaurs. God destroys dinosaurs. Life finds a way. God creates dinosaurs. God destroys dinosaurs. Life finds a way. God creates dinosaurs. God destroys dinosaurs. ",
        "pro": false,
        "examples": [
            `console.log("Hello world!")`,
            `function add(arg1, arg2) {
                return arg1 + arg2
            }`,
        ],
        "challenges":[
            {
                "id": "1",
                challenge: "The following function doesn't return anything, please tweak the javascript code to make it work.",
                html: "<h1>Hello </h1>",
                css:"h1 {\n  color: grey;\n}",
                javascript: `function returnGreet() {\n  const title = document.getElementsByTagName("h1")[0];\n  title.textContent += name;\n};\nreturnGreet("Carl");`,
            },
            // {
            //     "id": "2",
            //     challenge: "Please print 'Hello World!' to the console (mind the eclamation mark)!",
            //     html: "",
            //     css:"",
            //     javascript:"",
            // },
        ],
    },

]