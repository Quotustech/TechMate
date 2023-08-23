const express = require('express');

const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const secretKey = 'your-secret-key';


const authCheck = async (req, res, next) =>{
    const token = req.headers.authorization
    // console.log("my token",token)
    if (!token) {
        return res.status(401).json({ error: 'Missing token ' });
      }
      const tokenWithoutBearer = token.split(' ')[1];

    // Use your JWT verification function to verify and decode the token
      const decoded =  await jwt.verify(tokenWithoutBearer,secretKey)
      // console.log("decoded data",decoded)
      if (!decoded) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const freshUser = await User.findById(decoded.userId)
      if(!freshUser){
        return res.status(401).json({ error: 'This token non belongs to this token' });

      }
      req.user = freshUser
      next();

    
    

}

module.exports ={
    authCheck
}