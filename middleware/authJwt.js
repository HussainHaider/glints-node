const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    console.log('req.headers');
    console.log(req.headers);
    let token = req.headers["authorization"];
    console.log('token: ' + token);
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