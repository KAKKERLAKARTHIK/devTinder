const mongoose = require('mongoose');

const userScheema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    emailId: String,
    mobileNumber: String,
    password: {
        type: String,
        required: true
    },
    gender: String,
})
const User = mongoose.model('user', userScheema)
module.exports = User