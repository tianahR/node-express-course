


const express = require('express');
const app = express();
 
const tasks = require('./routes/tasks')

const connectDB = require('./db/connect')

require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware

app.use(express.static('./public')) //week6
app.use(express.json())


// routes
// app.get('/hello', (req,res) =>{
//     res.send('Task manager App');

// }
// )



app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)



// const port = 3000 ;
const port = process.env.PORT ||3000 //port variable setting week 6 ---if not defined use 3000

const start = async () => {

    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`App listening on port ${port}   `));

    }catch(error){
        console.log(error);

    }

}

start();



