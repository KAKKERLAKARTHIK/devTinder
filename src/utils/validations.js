const validator = require('validator');
const bycrypt = require('bcrypt');
const signupValidations =(req)=>{
   const {firstName,lastName,emailId,password} = req.body||{}
   if(!firstName  ){
     throw new Error('first name and last name is required')
   }else if(!validator?.isEmail(emailId)){
     throw new Error('email is invalid')
   }else if(!validator?.isStrongPassword(password)){
     throw new Error('password should be at least 8 characters long')
   } 
  
}
const loginValidations=async(res,req)=>{
    console.log(res?.emailId,req?.emailId)

    if(!req?.emailId){
        return 'email is required'
    }else if(!req?.password){
        return 'password is required'
    }else if(!validator?.isEmail(req?.emailId)){
        throw new Error('email is invalid')
    } else if(res?.emailId !== req?.emailId){
      return   "Invalid Credentials"
    }else{
      return "success"
    }

}
module.exports = {signupValidations,loginValidations};