const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          console.log('error!!');
          return res.status(401).send({
            message: "Unauthorized!"
          });
        } 
        next();
    });
  };


module.exports = {
    verifyToken
};