//Write another program called writeWithPromisesThen.js also in the 01-node-tutorial/answers folder. 
//Again you write to temp.txt. You start it the same way, but this time, you use the .then style of asynchronous programming. 
//You don’t need to create any functions. Instead, you just use cascading .then statements in your mainline


const { writeFile, readFile } = require('fs').promises

writeFile('./temporary/temp.txt', 'Hello') //write line 1

.then(()=>{

    return writeFile('./temporary/temp.txt', '\nWorld',{ flag: 'a' })  // write line 2.  
//     // Return the promise so you can chain the .then statements 
})
.then(()=>{

    return writeFile('./temporary/temp.txt', '\nwelcome to Node JS',{ flag: 'a' })  // write line 3.  
//     // Return the promise so you can chain the .then statements 
})
.then((data)=>{

    return readFile('./temporary/temp.txt', 'utf8', (error, data) => {
            if (error) {
                console.log(error) ;
            } else {
                return data ;
            }
        }
        )
    })
    
.then((data) => {
            console.log(data) ;
})
.catch((error) => {
            console.log("An error occurred: ", error)
})





