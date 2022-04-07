const jwt = require("jsonwebtoken");

const accessTokenGenerator = email => 
    jwt.sign({ email }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn:"15m" });

const refreshTokenGenerator = email => 
    jwt.sign({ email }, 
        process.env.REFRESH_TOKEN_SECRET );
    
module.exports = {
    accessTokenGenerator,
    refreshTokenGenerator
}