const mongoose = require('mongoose');


const connectionScheema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.ObjectId,
        ref:'user'
    },
    toUserId: {
        type: mongoose.Schema.ObjectId,
        ref:'user'
    },
    status: {
        type: String,
        enum: ["Accepted", "Rejected", "Intrested", "Ignored"]
    }
}, { timestamps: true })

connectionScheema.pre("save",function(next){
    connectionUserData = this
     if(connectionUserData.fromUserId?.equals(connectionUserData.toUserId)){
        return next( new Error("Invalid request: Cannot send request to yourself"))
    }
    next()
})

const ConnectionModel = mongoose.model("connection",connectionScheema)
module.exports = ConnectionModel