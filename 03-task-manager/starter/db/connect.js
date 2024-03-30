const mongoose = require('mongoose')


// const connectionString = 
// ''

const connectDB = (url) =>{

  // return a promise 
  return mongoose
.connect(url,{
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  // useUnifiedTopology: true,
})
// .then(()=>{console.log('CONNECTED TO DB')})
// .catch((err)=>{console.log(err)})
}

module.exports = connectDB ;

