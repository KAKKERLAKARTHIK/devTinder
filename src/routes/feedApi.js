const express = require('express')
const feedRouter = express.Router()
const User = require("../models/user")
const ConnectionModel = require("../models/connectionScheema")

feedRouter.get("/feed", async function (req, res) {
    try {
        const user = req?.user

        const hideFromFeed = await ConnectionModel.find({
            $or: [{
                fromUserId: user?._id
            }, {
                toUserId: user?._id
            }]
        }).select(["fromUserId", "toUserId"])
        const exludingThidIds = new Set()
        hideFromFeed?.forEach((req) => {

            exludingThidIds.add(req?.fromUserId?.toString())
            exludingThidIds.add(req?.toUserId?.toString())
        })
        const findFeed = await User.find({
            $and: [{ _id: { $nin: Array.from(exludingThidIds) } }, { _id: { $ne: user?._id } }]
        }).select(["firstName", "lastName", "avatarUrl", "skills", "gender", "age", "emailId","about"])
        res.json({
            data: findFeed
        })
    } catch (error) {
        res?.status(500).json({
            meesage: error?.meesage || "Something Went Wrong!!!"
        })
    }

})
module.exports = feedRouter 