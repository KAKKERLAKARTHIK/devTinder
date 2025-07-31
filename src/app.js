const express = require('express');
const app = express();
const connectDatabase = require('./config/database');
const User = require('./models/user');
const { userAuthentication } = require('./middlewere/authentication');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
require('dotenv').config({ path: __dirname + '/.env' });

//middlewares handler
app.use(express.json());
app.use(cookieParser())

// authentication routing
app.use("/auth",authRouter)
//profile routing
app.use("/profile",userAuthentication,profileRouter)

connectDatabase().then(() => {
   console.log("Database connected");
   app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
   console.log(err);
});


