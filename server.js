const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const errorHandler = require("./middlewares/errorHandler");
//middlewares
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

//routes
app.use("/ap/users",userRoute)
app.get('/', (req, res)=>{
    res.send("Hello")
})

//error handler
app.use(errorHandler);
//db connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Db connection successful')
}).catch((err) => {
    console.log(err);
});

app.listen(PORT, ()=> console.log(`Server is up at ${PORT}`))




