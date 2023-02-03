const jwt = require("jsonwebtoken")

const auth = async (req , res , next) => {

    const token = req.headers["x-api-key"]
    if(!token) return res.status(400).send({status : false , msg : "token is missing , plz provide token"})

    const decodeToken = await jwt.verify(token , "validateUserAuthorization")
    if(!decodeToken) return res.status(401).send({status : false , msg : "token is not verify, Authetication Error"})

    req.decodeToken = decodeToken
    next()
}

module.exports = {auth}