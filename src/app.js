const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

 

 

// ✅ GET user by ID
// app.get('/user/:userId', (req, res) => {
//     const userId = req.params.userId;
//     const users = fs.readFileSync('src/db.json', 'utf8') ||[]
//     const userData = users.find(user => user.userId === userId);

//     if (userData) {
//         res.json(userData);
//     } else {
//         res.status(404).send('User not found');
//     }
// });

app.use('/user',(req, res,next) => {
     next();
     // res.send('User not found');   
},(req, res,next) => {
     // res.send('User not found22');
     next()
}, (req, res,next) => {
     // res.send('User not found33');
     next()
}, (req, res) => {
     res.send('User not found44');
})
// ✅ POST new user
app.post('/user/:userId', (req, res) => {
    const requestBody = req.body;
    const reqParam = req.params
    // ✅ Read file content and parse it as JSON
    let users = [];
    try {
        const fileData = fs.readFileSync('src/db.json', 'utf8');
        users = JSON.parse(fileData || '[]');
    } catch (err) {
        console.error("Error reading db.json:", err);
        users = [];
    }
//     console.log(requestBody,'requestBody');
    if(reqParam.userId == 0) {
     console.log(users,'users');
     console.log(requestBody,'requestBody');
         const existingUser = users?.find(user => user.userId === reqParam.userId ||  user.firstName === requestBody.firstName);
     console.log(existingUser,'requestBody');
    if (!existingUser) {
        users.push({...requestBody,userId: users?.length + 1});
        fs.writeFileSync('src/db.json', JSON.stringify(users, null, 2)); 
        res.status(201).json(users);
    } else {
        res.status(409).send("User already exists");
    }
    }else{
     res.status(500).send("somthing went wrong");
    }
   
});

app.listen(3000, () => console.log('Listening on port 3000'));
