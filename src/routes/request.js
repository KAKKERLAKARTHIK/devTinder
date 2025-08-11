const express = require("express")
const requestRouter = express.Router()
const ConnectionModel = require("../models/connectionScheema")
const User = require("../models/user")

requestRouter.post("/send/:status/:toUserId", async (req, res) => {
    try {
        let user = req.user;
        const { toUserId, status } = req.params;

        // Validate status
        const allowedStatus = ["Intrested", "Ignored"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid Status code"
            });
        }
        //    if (user?._id.equals(toUserId)) {
        //     return res.status(400).json({
        //         message: 'Invalid request: Cannot send request to yourself'
        //     });
        // }
        const isUser = await User.findById(toUserId);
        if (!isUser) {
            return res.status(404).json({
                message: 'User does not exist'
            });
        }


        const isExistingRequest = await ConnectionModel.findOne({
            $or: [
                { fromUserId: user._id, toUserId },
                { fromUserId: toUserId, toUserId: user._id }
            ]
        });

        if (isExistingRequest) {
            return res.status(400).json({
                message: "A request already exists for this user"
            });
        }

        const result = await ConnectionModel.create({
            fromUserId: user._id,
            toUserId,
            status
        });

        res.json({
            message: `${status === "Intrested" ? "Request sent successfully" : "Rejection sent successfully"} `,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something went wrong"
        })
    }


})
requestRouter.post("/review/:status/:requestId", async (req, res) => {
    try {
        const { status, requestId } = req.params;
        let user = req.user;
        const allowedFields = ["Accepted", "Rejected"];
        if (!allowedFields.includes(status)) {
            return res.status(500).json({
                message: "Invalid Status"
            })
        }

        const connectionRequest = await ConnectionModel.findOne({
            _id: requestId,
            toUserId: user._id,
            status: "Intrested"
        })
        console.log({
            _id: requestId,
            toUserId: user._id,
            status: status
        })
        if (!connectionRequest) {
            return res.status(404).json({
                message: "Invalid Request"
            })
        }
        connectionRequest.status = status
        const data = await connectionRequest.save()
        res.json({
            message: `Request ${status} successfully`,
            data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something went wrong"
        })
    }
})

module.exports = requestRouter 