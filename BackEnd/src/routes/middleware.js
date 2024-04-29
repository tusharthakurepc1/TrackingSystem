const jwt = require("jsonwebtoken")
const SECRET_KEY = require("../constants")

const organizationUserLoginAuthencation = async (req, res, next) => {
    const userToken = req.cookie?.uID

    if (!userToken || userToken === "") {
        return res.status(200).json({success: false})
    }
    const user = validateuserToken(userToken)
    
    req.user = user
    next()
}

const validateuserToken = (token) => {
    try{
        return jwt.verify(token, SECRET_KEY)
    }
    catch(err){
        return null;
    }

}

module.exports = organizationUserLoginAuthencation;
