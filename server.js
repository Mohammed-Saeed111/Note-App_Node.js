// Dot Env
require("dotenv").config()
// express
const express = require("express");
const app = express();
// Middleware 
app.use(express.json());
// Port
const port = process.env.PORT  || 5000;
// DB Connection
const mongoose = require("mongoose");


async function connectDB() {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected DB!")
    }catch (error){
        console.log(error);

    }

}
connectDB()
// Listen or Run Server
app.listen(port,  () => {
    console.log(`Server is Running At Port ${port}`)
})