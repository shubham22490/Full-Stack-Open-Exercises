const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, resp) => {
    Blog.find({}).then((blogs) => {
        resp.json(blogs)
    })
})

blogRouter.post('/', (req, resp) => {
    const blog = new Blog(req.body)

    blog.save().then(res => {
        resp.status(201).json(res)
    })
})

module.exports = blogRouter