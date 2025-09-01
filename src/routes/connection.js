const express = require('express')
const connectionRouter = express.Router()
const ConnectionModel = require("../models/connectionScheema")

connectionRouter.get('/request', async (req, res) => {
    try {
        const user = req.user

        const allRequest = await ConnectionModel.find({
            toUserId: user?._id,
            status: "Intrested",
        }).populate("fromUserId", ["firstName", "lastName", "avatarUrl"])

        console.log(allRequest)
        res.json({data:allRequest})
    } catch (error) {
        res.status(500).json({
            message: error?.message || "Something went wrong!!!"
        })
    }
})

connectionRouter.get("/connections", async function (req, res) {
    try {
        const user = req?.user
        const getAllConnection = await ConnectionModel.find({
            $or: [
                {
                    toUserId: user?._id,
                    status: "Accepted"
                }, {
                    fromUserId: user?._id,
                    status: "Accepted"
                }
            ]
        }).populate("fromUserId", ["firstName", "lastName", "avatarUrl", "skills", "gender", "age"]).populate("toUserId", ["firstName", "lastName", "avatarUrl", "skills", "gender", "age"])
        const data = getAllConnection?.map((row) => {
            if (row?.fromUserId?._id.toString() === user?._id.toString()) {
                return row?.toUserId
            } else {
                return row?.fromUserId
            }
        })
        res.json({
            data,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error?.message || "Something Went Wrong!!"
        })
    }
})

module.exports = connectionRouter