const jwt = require('jsonwebtoken')
const user = require('../models/user')

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
        let token = req.cookies?.token
        if (!token) {
            throw new Error('Invalid Token')
        }
        let result = jwt.verify(token, process.env.SECRET_KEY)
        console.log(process.env.SECRET_KEY, result)
        if (!result) {
            throw new Error('Invalid Token')
        }
        const { id } = result || {}
        const userData = await user.findById(id)
        if (!userData) {
            throw new Error('User not found')
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