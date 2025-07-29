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
    
    if(!req?.emailId){
        throw new Error('email is required')
    }else if(!req?.password){
        throw new Error('password is required')
    }else if(!validator?.isEmail(req?.emailId)){
        throw new Error('email is invalid')
    } else if(res?.emailId !== req?.emailId){
        throw new Error('invalid credntials')
    }
}
module.exports = {signupValidations,loginValidations};