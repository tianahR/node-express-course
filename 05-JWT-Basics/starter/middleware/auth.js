
// setup authentication so only the request with JWT can access the dasboard

const jwt = require('jsonwebtoken') // import the jwt package
const {UnauthenticatedError} = require('../errors')


const authenticationMiddleware = async (req, res, next) => {

    console.log(req.headers);
    const authHeader = req.headers.authorization;
    console.log(`authHeader is ${authHeader}`)

    //check if there is an authorization header - if not throw custom Error
    if(!authHeader || !authHeader.startsWith('Bearer '))
    {
        throw new UnauthenticatedError('No token provided')
    }

    const token = authHeader.split(' ')[1]
    console.log(`Token is ${token}`)


    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        const {id, username} = decoded
        req.user = {id,username}
        next()

        

    }catch(error){
        // throw new CustomAPIError('Not authorized to access this route',401)
        throw new UnauthenticatedError('Not authorized to access this route')
    }
  

  
}

module.exports = authenticationMiddleware