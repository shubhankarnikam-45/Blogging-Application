const express = require("express");
require("dotenv").config();
const app = express();
const clc = require("cli-color")

//database start.
require("./db")

//file export.
const authRouter = require("./routers/authRouter")
//port 
const PORT = process.env.PORT;

//middleware (global)
app.use(express.json());
app.use(express.urlencoded())

app.use("/auth",authRouter)


app.listen(PORT,()=>{
    console.log(clc.bgBlueBright(`server is running on port ${PORT}`))
})