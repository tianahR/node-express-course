// 11-fs-async.js: This should load the fs module, and use the asynchronous
//  function writeFile to write 3 lines to a file, ./temporary/fileB.txt. 
// Now, be careful here! This is our first use of asynchronous functions in this class, 
// but we are going to use them a lot! First, you need to use the "append" flag for all but the first line.
//  Second, each time you write a line to the file, you need to have a callback, 
// because the writeFile operation is asynchronous. Third, for each line you write, 
// you need to do the write for the line that follows it within the callback - otherwise the operations won’t happen in order.
//  Put console.log statements at various points in your code to tell you when each step completes. 
// Then run the code. Do the console log statements appear in the order you expect?
//  Run the program several times and verify that the file is created correctly.
//  Here is how you might start:

const { readFileSync, writeFile } = require("fs");

console.log("At start");

writeFile("./temporary/fileB.txt", "This is line 1\n",(err, result) => {
  
      console.log("at point 1");
        if (err) {
              console.log("This error happened: ", err);
              return ;
        } else 
        {
          // line 2 

          writeFile("./temporary/fileB.txt", "This is line 2\n",{ flag: 'a' }, (err, result) => {
  
            console.log("at point 2");
              if (err) {
                    console.log("This error happened: ", err);
                    return ;
              } else 
              {
                // line 3 

                writeFile("./temporary/fileB.txt", "This is line 3\n",{ flag: 'a' },(err, result) => {
  
                  console.log("at point 3");
                    if (err) {
                          console.log("This error happened: ", err);
                          return ;
                    } 
                    else{

                      console.log("The written file has the following contents:");
                      console.log(readFileSync("./temporary/fileB.txt", "utf8"));
                      console.log("At the end");
                    }
            });
              }
      });
        }
});










