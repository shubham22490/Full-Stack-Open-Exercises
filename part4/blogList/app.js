const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controller/blogList')

const app = express()

logger.info('connecting to DB!')
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {logger.info("Connected to MongoDB")})
  .catch(err => logger.error("error connecting to MongoDB:", err.message))

app.use(express.json())
app.use("/api/blogs", blogRouter)

module.exports = app
