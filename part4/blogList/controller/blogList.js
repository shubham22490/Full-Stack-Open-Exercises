const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, resp) => {
    const blogs = await Blog.find({})
    resp.json(blogs)
})

blogRouter.post('/', async (req, resp) => {
    if(!req.body.title || !req.body.url){
        return resp.status(400).end()
    }

    const blog = new Blog({
        ...req.body,
        likes: req.body.likes === undefined ? 0 : req.body.likes
    })

    const resBlog = await blog.save()
    resp.status(201).json(resBlog)

})

blogRouter.delete('/:id', async (req, resp) => {
    await Blog.findByIdAndDelete(req.params.id)
    resp.status(204).end()
})

blogRouter.put("/:id", async (req, resp) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog) return resp.status(404).end()

    blog.likes = req.body.likes === undefined ? 0 : req.body.likes  
    const updatedBlog = await blog.save()
    resp.status(200).json(updatedBlog)
})

module.exports = blogRouter