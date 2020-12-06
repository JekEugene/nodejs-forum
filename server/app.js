const express = require("express")
const db = require("./config/database")
const app = express()
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")

const homeRouter = require("./routes/homeRouter")
const userRouter = require("./routes/userRouter")
const postRouter = require("./routes/postRouter")

const authenticateToken = require("./middleware/authenticateToken")

require("dotenv").config();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/", authenticateToken, homeRouter)
app.use("/user", authenticateToken, userRouter)
app.use("/post", authenticateToken, postRouter)

async function start(){
    app.listen(process.env.PORT)
}

start()