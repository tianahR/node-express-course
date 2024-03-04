const { writeFile, readFile } = require("fs").promises; 

// Then create an async function called writer that takes 0 arguments, 
//and that writes three lines to a file named temp.txt, by calling the writeFile function with await. 
//The Promise version of writeFile takes the same arguments as the one you used
// in last week’s exercise 10-fs-sync but will return a Promise instead of a result directly.
//Put the await statements inside a try/catch block!


const writer = async () => {

    try {
       await writeFile(
        './temporary/temp.txt',
        `\n Hello ! \n World \n Welcome to my Node JS \n `,
        { flag: 'a' })
       console.log ('File written succesfully') ;
       
    } catch(error) {
        console.log(`An error occurred: , ${error}`) ;
        return ;
    }
    
}

//Create another async function called reader that reads the file with await readFile 
//and logs the return value to the screen.

const reader = async () => {
    try {
       const data = await readFile('./temporary/temp.txt','utf8');
       console.log(data);
       
    } catch(error) {
        console.log(`Error reading file: , ${error}`) ;
        return ;
    }

    
}

//Now we want to call the two functions in order, first the writer, and the reader. 
//But, be careful! These are asynchronous functions, so if you just call them, 
//you don’t know what order they’ll occur in. And you can’t use await in your mainline code. 
//So, you write a third async function called readWrite. 
//In that function, you call await reader and await writer. 
//Finally, write a line at the bottom of the file that calls the readWrite function. 

const readWrite = async () => {

    try{

       
        await writer();
        await reader(); 


    }catch(error){
        console.log(`This is the error: ${error}`)
        return ;
    }
    
}

readWrite();

//Test your code. The temp.txt file that your code is creating should not be sent to Github, 
//so you should add this filename as
//another line to your .gitignore.