const express = require("express")
const jwt = require("jsonwebtoken")
const SECRET_KEY = require("../constants")

const Auth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(token == null){
        return res.status(400).json({status: false, msg: "Token "})
    }
    
    jwt.verify(token, SECRET_KEY, (err, decoded)=>{
        if(err){
            return res.status(400).json({status: false, msg: "Token Invalidate"})
        }
        // console.log(JSON.stringify(decoded['user'][0]));
        console.log("TOKEN: ",decoded);

        req.user = decoded?.['user']?.[0];
        next();
    })
}

module.exports = Auth;
