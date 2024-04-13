
// if exist create new JWT
// send back to frontend
// setup authentication so only the request with JWT can access the dasboard

const jwt = require('jsonwebtoken') // import the jwt package
const CustomAPIError = require('../errors/custom-error')

//check in the controllers

const login = async(req,res)=>{

    const { username, password } = req.body //// check username, password in post(login) request
    console.log(username,password)

    //check if username and password exist - if not throw error
    if (!username || !password) {
        throw new CustomAPIError('Please provide email and password',400)
      }

   
   //just for demo for the payload, normally provided by DB!!!!
    const id = new Date().getDate()

  // try to keep payload small, better experience for user
  // just for demo, in production use long secret, complex and unguessable string value!!!!!!!!!

   //create new token
  const token = jwt.sign(
    { id, username }, //payload
    process.env.JWT_SECRET, //jwt secret
    { expiresIn: '30d',} //options
)

    //res.send('Fake Login/Register/SignUp Route')
    res.status(200).json({
        msg:`User Created`,
        token})
}


// keep secret or authorized data
const dashboard = async (req, res) => {

    console.log(req.headers);
    const authHeader = req.headers.authorization;
    console.log(`authHeader is ${authHeader}`)

    //check if there is an authorization header - if not throw custom Error
    if(!authHeader || !authHeader.startsWith('Bearer '))
    {
        throw new CustomAPIError('No token provided',401)
    }

    const token = authHeader.split(' ')[1]
    console.log(`Token is ${token}`)

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)

        const luckyNumber = Math.floor(Math.random() * 100)

    
        res.status(200).json({
        msg: ` Hello ${decoded.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
        })

    }catch(error){
        throw new CustomAPIError('Not authorized to access this route',401)
    }
  
    
  }
  
module.exports = {
login,
dashboard,
}
  