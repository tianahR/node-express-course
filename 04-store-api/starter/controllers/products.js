const Product = require('../models/product') ;

const getAllProductsStatic = async (req,res)=>{

    // throw new Error('Testing async errors')
    // const products = await Product.find({featured: true} )
    const products = await Product.find({name: 'wooden table'} )
    res.status(200).json({products, nbHits: products.length})
}


const getAllProducts = async (req,res)=>{
    // res.status(200).json({msg:'products route'})

    // filtering data dynamically

    //to make sure that the properties to use in the query exists

    const { featured, company, name } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    // if property "company" exists 
    if (company) {
        queryObject.company = company;
    }

    // if property "name" exists 
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
  
    }



    // end of to make sure that the query exists 
    // const products = await Product.find(req.query )
    const products = await Product.find(queryObject );

    res.status(200).json({products, nbHits: products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}