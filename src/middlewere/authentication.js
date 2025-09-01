const jwt = require('jsonwebtoken')
const User = require('../models/user')
const mongoose = require('mongoose');

const adminAuthentication = (req, res, next) => {

    const token = req.headers.authorization;
    console.log("admin authentication called");
    if (token === "karthik") {
        next();
    } else {
        res.status(401).send("unauthorized");
    }
}
 
 

const userAuthentication = async (req, res, next) => {
    try {
        let token = req?.cookies?.token
        if (!token) {
            return res.status(401).send('Please Login')
        }
        let result = jwt.verify(token, process.env.SECRET_KEY)
        if (!result) {
            return res.status(401).send('Please Login')
        }
        const { id } = result || {}
        const userData = await User.findById(id)
        req.user = userData
        if (!userData) {
            return res.status(401).send('Please Login')
        }
        req.user = userData
        next()
    } catch (err) {
        res.status(500).send(err?.message || "Something went wrong");
    }

}
module.exports = {
    // adminAuthentication,
    userAuthentication
};