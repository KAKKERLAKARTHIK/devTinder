const express = require('express');
const app = express();
const cors = require('cors');
const connectDatabase = require('./config/database');
const User = require('./models/user');
const { userAuthentication } = require('./middlewere/authentication');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter  = require("./routes/request")
const connectionRouter = require("./routes/connection")
const feedRouter = require("./routes/feedApi")
require('dotenv').config({ path: __dirname + '/.env' });

//middlewares handler
app.use(express.json());
app.use(cookieParser())
app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
}))

// authentication routing
app.use("/auth",authRouter)
//profile routing
app.use("/profile",userAuthentication,profileRouter)
//requestRouter
app.use("/request",userAuthentication,requestRouter)
//connection Router
app.use("/user",userAuthentication,connectionRouter)
//feed router
app.use("/all",userAuthentication,feedRouter)

connectDatabase().then(() => {
   console.log("Database connected");
   app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
   console.log(err);
});


