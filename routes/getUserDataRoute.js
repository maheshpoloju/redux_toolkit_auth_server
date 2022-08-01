const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {User} = require('../models/userModel')


const authenticateUser = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    
    if (!authHeader) {
        response.status(401);
        response.send("Invalid JWT Token");
    } else {
        jwtToken = authHeader.split(" ")[1];
        jwt.verify(jwtToken, process.env.JWT_PRIVATE_KEY, (error, payload) => {
          if (error) {
            response.status(401);
            response.send("Invalid JWT Token");
          } else {
            request.email = payload.email;
            next()
          }
        });
    }
}

router.get('/getUserData', authenticateUser, async (request, response) => {
     const { email } = request;
     const user = await User.findOne({email: email})
     response.status(200).send(user)

})



module.exports = router;
