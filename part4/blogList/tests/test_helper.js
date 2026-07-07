const Blogs = require("../models/blog")


const initialBlogs = [
    {
        "title": "First Blog",
        "author": "Shubham",
        "url": "hello.txt",
        "likes": 0
    },
    {
        "title": "Second Blog",
        "author": "Rahul",
        "url": "bye.txt",
        "likes": 1
    }
]

const blogsInDB = async () => {
    const blogs = await Blogs.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDB
}