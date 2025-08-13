const express = require("express")
const User = require("../models/user")
const authRouter = express.Router()
const { signupValidations, loginValidations } = require('../utils/validations')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

// Sign Up api
authRouter.post("/signup", async function (req, res) {
    try {
        const signUpData = req.body
        signupValidations(req)
        const hashPassword =await bcrypt.hash(signUpData?.password, 10)
        signUpData.password = hashPassword
        const insertingIntoDb = await User.create(signUpData)
        res.send(insertingIntoDb)
    } catch (err) {
        res.status(500).send(err?.message || "something went wrong")
    }
})

authRouter.post("/login", async function (req, res) {
    try {
        const userCred = req.body;
        const findUser = await User.findOne({ emailId: userCred?.emailId })
        if (!findUser) {
            res.status(500).send("Invalid Credentials")
        }
        let result =await loginValidations(findUser, userCred)
        console.log(result, "result")
         if (result!=="success") {
            res.status(500).send(result)
        }
        const isPassWordMatch = await findUser?.validatePassword( userCred?.password )
        if (!isPassWordMatch) {
            res.status(500).send("Invalid Credentials ")
        }
        const token = await findUser.JWTtoken()
        res.cookie('token', token)
        res.send(findUser)
    } catch (error) {
        res.status(500).send(error?.message || "somthing went wrong!!!")
    }
})

authRouter.post("/logout",(req,res)=>{
    res.clearCookie('token', { path: '/' });
    res.send("user logout succesfully!")
})



module.exports = authRouter