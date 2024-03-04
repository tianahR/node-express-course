const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let backgroundColor = "";


// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
      
      return `
          <body>
                <h2> Select Background Color</h2>
                <h3>Comment</h3>

                <p>Background color changed to ${backgroundColor}</p>

                <form method="POST">
                    <select name = "color" id='colorSelect' >
                        <option value="white">White</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                    </select>
                    <button type="submit">Submit</button>

                </form>
                
          <style> 
              body{background-color:${backgroundColor}}
          </style>
                
          </body>
          
          
      `
      
  ;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      
      // here, you can add your own logic
      

      switch(body["color"]){
            case 'white':
              backgroundColor = "White" ;
              break;
            case 'red':
              backgroundColor = "Red";
              break;
            case 'green':
              backgroundColor = "Green"
              break;
            case 'blue':
              backgroundColor = "Blue"
              break;
            default :
            backgroundColor = "White"
      }
      // Your code changes would end here

      
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.on("request", (req) => {  
  console.log("event received: ", req.method, req.url);  
});  

server.listen(3000);
console.log("The server is listening on port 3000.");
