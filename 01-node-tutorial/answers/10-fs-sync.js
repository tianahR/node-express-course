// 10-fs-sync.js: This should load writeFileSync and readFileSync functions from the fs module. 
// Then you will use writeFileSync to write 3 lines to a file, ./temporary/fileA.txt, 
// using the "append" flag for each line after the first one. Then use readFileSync to read the file, 
// and log the contents to the console. Be sure you create the file in the temporary directory. 
// That will ensure that it isn’t pushed to Github when you submit your answers (because that file has been
//  added to the .gitignore file
//  for you already which tells git not to look at those files).


const { readFileSync, writeFileSync } = require('fs')
// console.log('start')
const first = readFileSync('../content/first.txt', 'utf8')
const second = readFileSync('../content/second.txt', 'utf8')


try{

  writeFileSync(
    './temporary/fileA.txt',
    `\n Here is the result :\n ${first}, \n ${second} `,
    { flag: 'a' }
  )
  
  console.log("The written file has the following contents:");
  console.log(readFileSync("./temporary/fileA.txt", "utf8"));

}
catch(err){
  console.log(err)
}

