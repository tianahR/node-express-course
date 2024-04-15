const jwt = require('jsonwebtoken');

//user inserts name, password making POST request
const logon = async (req, res) => {

   const { username, password } = req.body
  if (!username || !password || username === '' || password === '') {
    return res
      .status(400)
      .json({
        message:
          'You should provide BOTH username AND password to get access to Secret Data',
      });
  }
  const token = jwt.sign({ username, password }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  res.status(200).json({ message: 'user created', token })

};

//user gets secret data making GET request
const hello = async (req, res) => {
  res.status(200).json({
    message: `Hello , ${req.user.username}, happy that you use my app!`,
  });
};

module.exports = {
  logon,
  hello,
};