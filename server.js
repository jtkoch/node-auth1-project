const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const restricted = require("./middleware");

const usersRouter = require("./users/users-router")
const authRouter = require("./auth/auth-router")

const server = express()

const sessionConfig = {
  name: "Santa",
  secret: "I am not real",
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true for production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))
server.use("/api/users", restricted, usersRouter)
server.use("/api/auth", authRouter)
server.get("/", (req, res) => {
  res.json({ api: "up" })
})

module.exports = server