
const express = require ('express');
const app = express();

const {products} = require('./data');


// setup static and middleware
app.use(express.static("./public"));


app.get('/api/v1/test',(req,res)=>{
    res.json({ message: "It worked!" });
})

// ---------------------------------

app.get('/api/v1/products',(req,res)=>{
    const newProducts = products.map((product) => {
        const { id, name, image, price, desc } = product
        return { id, name, image, price, desc }
      })
    
      res.json(newProducts)
})

// ------------------------------


// retrieve a particular product by ID


// app.get('/api/v1/products/:productID', (req, res) => {
    
//     return res.json(req.params)
// })

// ---------------------------------------

// retrieve a particular product by ID

app.get('/api/v1/products/:productID', (req, res) => {
    
    const idToFind = parseInt(req.params.productID); 
    const product = products.find((p) => p.id === idToFind);
   
    if (!product) {
    
    return res.status(404).json({ message: "That product was not found."})
    }
  
    return res.json(product)
  })

//   -------------------------------------

//   The user may also want to do a simple search, instead of getting all the products. 
//  In this case, the url would contain a query string, like: /api/v1/query?search=al&limit=5&price=20

app.get('/api/v1/query', (req, res) => {

    console.log(req.query)

    const { search, limit,price } = req.query
    
    let sortedProducts = [...products]
  
    if (search) {
      sortedProducts = sortedProducts.filter((product) => {
        return product.name.startsWith(search)
      })
    }
    if (limit) {
      sortedProducts = sortedProducts.slice(0, Number(limit))
    }

    if (price) {
        sortedProducts = products.filter(product=>product.price<Number(price));
    }


    if (sortedProducts.length < 1) {
      
      return res.status(200).json({ success: true, data: [] })
    }
    res.status(200).json(sortedProducts)
  })


// --------------------------------------


app.all('*',(req,res)=>{
    res.status(400).send('<h1>Page not found</h1>')
})



app.listen(3000,()=>{
    console.log('server listening on port 3000');
});
