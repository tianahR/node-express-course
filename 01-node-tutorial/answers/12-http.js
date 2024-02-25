
// 12-http.js. This program should use the built-in http module to create a simple web server that listens on port 3000. 
// This is done with the createServer function. 
// You pass it a callback function that checks the request variable (req) for the current url property, 
// and depending on what the URL is, sends back a message to the browser screen. 
// Then have your code listen on port 3000, run this file with the node command, and test it from your browser, 
// by navigating to http://localhost:3000. 


const http = require('http')


const server = http.createServer((req, res) => {
  
      if (req.url === '/') {
            res.end('Welcome to our Home page') ;
      } else if (req.url === '/about') {
            res.end('Here is our short history') ;
      } else {
        res.end(`
            <h1>Oops!</h1>
            <p>We can't seem to find the page you are looking for</p>
            <a href="/">back home</a>
        `)
      }
})

server.listen(3000)
