// It should create a read stream for the big file (../content/big.txt) with encoding of "utf8" 
// and a highWaterMark of 200. The highWaterMark is the maximum amount of bytes that node will read
//  with each chunk of the stream. The program should initialize a counter to 0. 
// Then it should handle the “data” event for the stream by incrementing the counter and logging the event result to the screen.
//  Then it should handle the “end” event by reporting the number of chunks received. Finally, it should handle the stream “error” event by logging the error to the console. 
// Test the program for several values of highWaterMark. 

//importing the fs Module:
const {createReadStream} = require('fs');

//creating a readable Stream:
const readableStream = createReadStream('../content/big.txt',{encoding:'utf8',highWaterMark:200});

//listening for data events
let counter = 0;
readableStream.on('data', (chunk)=>{
    counter ++ ;
    console.log(`Received data chunck: ${chunk}`);
});

//Listening for end event
readableStream.on('end',()=>{
    console.log(`Finished reading the file.Total chunks:${counter}`);
});

//error handling 
readableStream.on('error',(error)=>{
    console.error('An error occured',error);
});