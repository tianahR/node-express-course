const login = async(req,res)=>{
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
  