
// if exist create new JWT
// send back to frontend
// setup authentication so only the request with JWT can access the dasboard


const CustomAPIError = require('../errors/custom-error')

const login = async(req,res)=>{

    const { username, password } = req.body //// check username, password in post(login) request
    //console.log(username,password)

    //check if username and password exist - if not throw error
    if (!username || !password) {
        throw new CustomAPIError('Please provide email and password',400)
      }

    res.send('Fake Login/Register/SignUp Route')
}


// keep secret or authorized data
const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
  
    res.status(200).json({
      msg: `Hello Fara`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
  }
  
module.exports = {
login,
dashboard,
}
  