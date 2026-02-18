const jwt = require("jsonwebtoken");

function identifyUser(req, res, next) {
  //to know which user is requesting
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided, Unauthorized access",
    });
  }

  let decoded = null; //so that decoded become global variable

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET); //jis user ka token nikla us user ki post hai
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }
  //if dont use try catch then the server will show status code 500 (internal server error) which is not good.
  //401 status code for unauthorized

  req.user = decoded; //creating a new property named "user"

  next();
}

module.exports = identifyUser;
