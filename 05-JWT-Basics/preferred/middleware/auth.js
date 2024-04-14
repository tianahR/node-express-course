//we take the 1st element of the string using the split() function
//and validate the token
//If the token is present and valid, the middleware gets the user’s name from the token payload, then it creates a hash with one key “username” and a value being the user’s name
// and we save it in req.user
//we call next() to pass control to the controller for the GET request



const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {

   return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decoded;
    req.user = { username };
    next();

  } catch (error) {

    res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

module.exports = authenticationMiddleware;

