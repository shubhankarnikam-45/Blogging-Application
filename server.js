const express = require("express");
require("dotenv").config();
const app = express();
const clc = require("cli-color")
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);

const store = new mongodbSession({
    uri: process.env.MONGO_URI,
    collection: 'blogSessions'
})

//database start.
require("./db")

//file export.
const authRouter = require("./routers/authRouter")
//port 
const PORT = process.env.PORT;

//middleware (global)
app.use(express.json());
app.use(express.urlencoded())


//middleware for the session.
app.use(session({
    secret: process.env.SECRET,
    store: store,
    resave: false,
    saveUninitialized: false
}))

app.use("/auth", authRouter)



app.listen(PORT, () => {
    console.log(clc.bgBlueBright(`server is running on port ${PORT}`))
})