const express = require("express")

const accounts = require("../api/routes/accountsRouter")

const server = express()

server.use(express.json())

server.use("/api", accounts)

module.exports = server
