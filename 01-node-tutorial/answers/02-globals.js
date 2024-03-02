// GLOBALS  - NO WINDOW !!!!

// __dirname  - path to current directory
// __filename - file name

// process    - info about env where the program is being executed



console.log(`Path to current directory ${__dirname}`);
console.log(`File name ${__filename}`);

setInterval(() => {
console.log(`Greetings : ${process.env.MY_VAR}`);
},5000)

