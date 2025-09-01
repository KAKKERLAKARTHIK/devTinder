const express = require("express")
const User = require("../models/user")
const profileRouter = express.Router()
const bcrypt = require("bcrypt")
const validator = require('validator');



profileRouter.get('/view', async (req, res) => {
    try {
        const userData = req.user
        const findUserData = await User.findById(userData?._id)
        if (findUserData) {
            res.send(findUserData)
        } else {
            throw new Error("Something went wrong!!")
        }
    } catch (error) {
        res.status(500).send(error?.message || "Something went wrong!!")
    }
})

profileRouter.patch("/edit", async (req, res) => {
    try {
        const userData = req?.body
        const allowedFieldsToEdit = ['firstName', 'lastName', 'age', 'userId', 'address', 'mobileNumber', 'gender', 'skills', 'avatarUrl','about',  ]
        const isAllowed = Object.keys(userData).some((key) => {
            if (!allowedFieldsToEdit.includes(key)) {
                res.status(400).send("were not allowing to update this field  " + key)
            }
        })
        const loggedUserData = req.user
        Object.keys(userData).forEach((key) => loggedUserData[key] = userData[key])
        await loggedUserData.save()
        res.send(loggedUserData)
    } catch (error) {

        res.status(500).send(error?.message || "Something went wrong!!")
    }
})

// const bcrypt = require('bcrypt');        
// const validator = require('validator');

profileRouter.patch('/updatepassword', async (req, res) => {
    try {
        const { currentPassword, password, userId } = req.body;
        if (!currentPassword || !password || !userId) {
            throw new Error("Missing fields");
        }
        const user = req.user
        if (!user) throw new Error("User not found");
        const isPassWordMatch = await bcrypt.compare(currentPassword, user?.password)
        if (!isPassWordMatch) {
            throw new Error("Invalid Password")
        }

        if (!validator.isStrongPassword(password)) {
            throw new Error("Pleas try some Stronger password")
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        user.password = hashPassword
        await user.save();

        res.send("Password updated successfully");
    } catch (error) {
        res.status(500).send(error?.message || "Something went wrong!!")
    }
})
module.exports = profileRouter