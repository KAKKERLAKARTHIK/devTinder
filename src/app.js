const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
const connectDatabase = require('./config/database');
const User = require('./models/user');

app.post('/user/createUser', async(req, res) => { 

  const user = req.body;
  if(user){
     const newUser = new User(user);
      await  newUser.save().then((result) => {
        res.status(201).json(result);
     }).catch((err) => {
        res.status(500).json(err);
     })
  }
 });
connectDatabase().then(() => {
    console.log("Database connected");
app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.log(err);
});


