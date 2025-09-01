const mongoose = require('mongoose');
const validatior = require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userScheema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true
    },
    age: Number,
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validatior.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    address: String,
    mobileNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validatior.isStrongPassword(value)) {
                throw new Error('Password length should be contain at least one uppercase letter, one lowercase letter, one number and one special character')
            }
        },
        minLength: [8, 'Password length should be at least 8 characters']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        // required: true
    },
    skills: {
        type: [String],
        validate: (value) => {
            if (value.length > 3) {
                throw new Error('skills should be less than 3')

            }
            return true
        }
    },
    avatarUrl: {
        type: String,
        default: (value) => {
            if (value.gender === 'male') {
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmwCmC6pZjmJZsvvNufFvqxJf7_C73ff3_Bg&s"
            } else if (value.gender === 'female') {
                return "https://static.vecteezy.com/system/resources/previews/045/711/163/non_2x/default-avatar-female-profile-icon-grey-photo-placeholder-gray-profile-anonymous-face-picture-illustration-for-social-media-dating-profile-forum-vector.jpg"
            } else {
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTwmfsxnhatJ6JaO3fYb6Cpe6oHEsfTV9_bg&s"
            }
        },
        // validate: (value) => {
        //     if (!validatior.isURL(value)) {
        //         throw new Error('url is invalid')
        //     }
        //     return true
        // }
    },
    about:{
        type:String,
   default:"this is the defualt for user "
    }
}, { timestamps: true })
userScheema.methods.JWTtoken = async function (req,res) {
    const user = this
    let token = await jwt.sign({ id: user?._id }, process.env.SECRET_KEY)

    return token
}
userScheema.methods.validatePassword = async function (userEnteredPassword) {
    const user = this
    const hashedPassword = user.password
    const isPasswordValid =await bcrypt.compare(userEnteredPassword, hashedPassword)
    return isPasswordValid
}
const User = mongoose.model('user', userScheema)
module.exports = User