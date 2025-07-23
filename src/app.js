const express = require('express');
const app = express();

app.use((req, res, next)=>{
     res.send("server is called")
})




app.listen(3000, () => console.log('Listening on port 3000'));
