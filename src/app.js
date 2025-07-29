const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
const connectDatabase = require('./config/database');
const User = require('./models/user');
const { userAuthentication } = require('./middlewere/authentication');
const { signupValidations, loginValidations } = require('./utils/validations')
const bycrypt = require('bcrypt');



app.use(userAuthentication)
//get user
app.get('/user/getUser', async (req, res) => {
   const userEmailId = req.body.emailId
   let user = await User.findOne({ "emailId": userEmailId })
   res.send(user)
})
// get all data
app.get('/user/feed', async (req, res) => {
   await User.find().then((result) => {
      res.status(200).json(result);
   }).catch((err) => {
      res.status(500).json(err);
   })
})
//create new user
app.post('/user/createUser', async (req, res) => {
   const user = req.body;
   try {
      signupValidations(req)
      const encrypted = await bycrypt.hash(user?.password, 10);
      user.password = encrypted;
      const result = await User.create(user);
      res.send(result);
   } catch (err) {
      res.status(500).send(err?.message || "Something went wrong");
   }
});
app.post('/user/login', async (req, res) => {
   try {
      const user = req.body;
      const result = await User.findOne({ "emailId": user?.emailId });
      console.log(result)
      if (!result) {
         throw new Error('user not found')
      }
      console.log(result?.password, user.password)
      const isMatch = await bycrypt.compare( user.password,result?.password);
      if (!isMatch) {
         throw new Error('invalid credntials');
      }
      loginValidations(result, user)
      res.send(result);


   } catch (err) {

      res.status(500).send(err?.message || "Something went wrong");
   }
})
// delete user
app.delete('/user/deleteUser', async (req, res) => {
   try {
      const user = req.body;
      const deleteUser = await User.findByIdAndDelete(user?.userId)
      res.send(deleteUser)
   } catch (err) {
      res.status(500).send("Something went wrong!");
   }
});
//update user
app.patch("/user/updateUser", async (req, res) => {
   try {
      const user = req.body;

      const allowedFields = ['firstName', 'lastName', 'age', 'userId', 'address', 'mobileNumber', 'password', 'gender', 'skills', 'avatarUrl']
      Object.keys(user).forEach(key => {
         if (!allowedFields.includes(key)) {
            res.status(400).send("were not allowing to update this field  " + key)
         }
      })
      const updateUser = await User.findByIdAndUpdate(user?.userId, user, { returnDocument: 'before', runValidators: true, Strict: true })
      res.send(updateUser)
   } catch (err) {
      res.status(500).send(`"Something went wrong!"${err}`);
   }
})
connectDatabase().then(() => {
   console.log("Database connected");
   app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
   console.log(err);
});


