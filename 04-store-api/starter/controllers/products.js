const Product = require('../models/product') ;

const getAllProductsStatic = async (req,res)=>{

    // throw new Error('Testing async errors')
    // const products = await Product.find({featured: true} )
    const products = await Product.find({ price: { $gt: 30 }}) //greater than 30
    .sort('name')
    .select('name price')
    .limit(10) //use skip and limit for pagination functionality
    .skip(5)
    res.status(200).json({products, nbHits: products.length})
}


const getAllProducts = async (req,res)=>{
    // res.status(200).json({msg:'products route'})

    // filtering data dynamically

    //to make sure that the properties to use in the query exists

    const { featured, company, name, sort, fields, numericFilters } = req.query;
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


    // numeric filter

    if (numericFilters) {
        const operatorMap = {
          '>': '$gt',  
          '>=': '$gte',
          '=': '$eq',
          '<': '$lt',
          '<=': '$lte',
        };

        console.log(numericFilters) ;
        const regEx = /\b(>|>=|=|<|<=)\b/g;

        // converted values understood by the mongoose
        let filters = numericFilters.replace(
          regEx,
          (match) => `-${operatorMap[match]}-`
        );

        console.log(filters);

        const options = ['price', 'rating']; //2 properties that use number value

        filters = filters.split(',').forEach((item) => {
            
          const [field, operator, value] = item.split('-');  //array destructuring
          if (options.includes(field)) {
            queryObject[field] = { [operator]: Number(value) };
          }
        });
      }



    // end of to make sure that the query exists 
    // const products = await Product.find(req.query )
    // const products = await Product.find(queryObject );

    console.log(queryObject);

    // sort
    let result = Product.find(queryObject);

    // use mongoose sort filter
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }else {
        result = result.sort('createdAt');
    }

    //end of use mongoose sort filter

    // use of mongoose select filter 

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }

    //end of use of mongoose select filter

    // use of mongoose skip and limit filter for pagination functionality

    const page = Number(req.query.page) || 1; //default 1
    const limit = Number(req.query.limit) || 10; //default 10
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    //end of pagination

    const products = await result;

    res.status(200).json({products, nbHits: products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}