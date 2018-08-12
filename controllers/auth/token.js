var jwt = require('jsonwebtoken'); 
var config = require('../../config/config')[process.env.NODE_ENV]; 

/**
 * @description
 * middleware that verify the token before giving any access to resources
 */
function verifyToken(req, res, next) {

  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'Token Not Authorized.' });
  } else {
    console.log(token)
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) { return res.status(500).send({ auth: false, message: err }); } 
      req.userId = decoded.id;
      next();
    });
  }
}

module.exports = verifyToken;