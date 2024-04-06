// automating adding to database

require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json') //products.json is a file where the data are stored

const start = async () => {

  try {

        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany(); //delete all products that are already in the model
        await Product.create(jsonProducts) //creating products dynamically 
        console.log(' Automating adding to database Successful!!!!')
        process.exit(0) //exiting the process - 0 means everything went well 
  } catch (error) {

        console.log(error)
        process.exit(1)
  }
}

start()
