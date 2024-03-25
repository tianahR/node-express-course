
const express = require ('express');
const app = express();

// week 3 

// const {products} = require('./data');


// // setup static and middleware
// app.use(express.static("./public"));


// app.get('/api/v1/test',(req,res)=>{
//     res.json({ message: "It worked!" });
// })

// // ---------------------------------

// app.get('/api/v1/products',(req,res)=>{
//     const newProducts = products.map((product) => {
//         const { id, name, image, price, desc } = product
//         return { id, name, image, price, desc }
//       })
    
//       res.json(newProducts)
// })

// // ------------------------------


// // retrieve a particular product by ID


// // app.get('/api/v1/products/:productID', (req, res) => {
    
// //     return res.json(req.params)
// // })

// // ---------------------------------------

// // retrieve a particular product by ID

// app.get('/api/v1/products/:productID', (req, res) => {
    
//     const idToFind = parseInt(req.params.productID); 
//     const product = products.find((p) => p.id === idToFind);
   
//     if (!product) {
    
//     return res.status(404).json({ message: "That product was not found."})
//     }
  
//     return res.json(product)
//   })

// //   -------------------------------------

// //   The user may also want to do a simple search, instead of getting all the products. 
// //  In this case, the url would contain a query string, like: /api/v1/query?search=al&limit=5&price=20

// app.get('/api/v1/query', (req, res) => {

//     console.log(req.query)

//     const { search, limit,price } = req.query
    
//     let sortedProducts = [...products]
  
//     if (search) {
//       sortedProducts = sortedProducts.filter((product) => {
//         return product.name.startsWith(search)
//       })
//     }
//     if (limit) {
//       sortedProducts = sortedProducts.slice(0, Number(limit))
//     }

//     if (price) {
//         sortedProducts = products.filter(product=>product.price<Number(price));
//     }


//     if (sortedProducts.length < 1) {
      
//       return res.status(200).json({ success: true, data: [] })
//     }
//     res.status(200).json(sortedProducts)
//   })

// end of week 3

// ------------------------------------------------

// middleware week 4

// moved to logger.js 

// const logger = (req, res, next) => {
//   const method = req.method;
//   const url = req.url;
//   const today = new Date();
//   const date =
//     today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
//   const time =
//     today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   const dateTime = date + " " + time;

//   console.log(method, url, dateTime);
//   next();
// };

// app.use(["/", "/about"], logger);

// app.get('/',logger, (req, res) => {
//   res.send('Home')
// })
// --------------------------------



// const logger = require("./logger");

// app.use(logger); //apply to all urls

// app.get('/',(req, res) => {
//   res.send('Home')
// })

// app.get('/about', (req, res) => {
//   res.send('About')
// })

// GET AND POST API FOR PEOPLE
// const {people} = require ("./data");

/**
 * You now need to add a require statement in the app.js file, 
to import the peopleRouter code. 
Then you need  app.use() statement
 */
const peopleRouter = require("./routes/people") //refactoring router for people


//static assets
app.use(express.static("./methods-public"));


//parse form data
app.use(express.urlencoded({ extended: false }));
//parse json
app.use(express.json());

// app.get('/api/v1/people', (req, res) => {
//   res.status(200).json({ success: true, data: people });
// });

app.use("/api/v1/people", peopleRouter); //refactoring router for people


// app.post('/api/v1/people', (req, res) => {
//   const { name } = req.body;
//   if (!name) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide a name" });
//   }
//   people.push({ id: people.length + 1, name: name });
//   res.status(201).json({ success: true, person: name });
// });

// testing the FRONTEND provided by the instructor

app.post('/login',(req,res)=>{

  const { name } = req.body
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }

  res.status(401).send('Please Provide Credentials') 
  //res.send('POST')
}
)

// end of API GET AND POST FOR PEOPLE




// END OF week 4 middleware



// app.all('*',(req,res)=>{
//     res.status(400).send('<h1>Page not found</h1>')
// })





app.listen(3000,()=>{
    console.log('server listening on port 3000');
});
