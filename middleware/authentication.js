// authorization middleware
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const authentication = (req, res, next) => {
  // get the headers from this request
  const headers = req.headers['authorization'] //Bearer <token>
  if(headers){
    const token = headers.split('')[1]
    // verify the token
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if(error){
        // unable to verify the token
        res.status(401).json({"status": "Authentication failed"})
      } else if(decoded) {
        // token verified
        //const userid = decoded.userid
        // const persistedUser = users.find((u) => u.userid == userid)
        // if(persistedUser){ }
        req.headers['payload'] = decoded
        next();
      } else {
        res.json({success: false, message: 'Unable to verify'})
      }
    })
  }
  else {
    res.status(401).json({"status": "Authentication failed"})
  }
  
}

module.exports = authentication