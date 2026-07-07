const {test, describe, beforeEach, after} = require("node:test")
const assert = require("node:assert")
const supertest = require('supertest')
const app = require("../app")
const mongoose = require('mongoose')
const Blog = require("../models/blog")
const helper = require('./test_helper')


const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test("verify number of blogs", async() => {
    const resp = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(resp.body.length, helper.initialBlogs.length)
})

test("unique identifier property is named id", async () => {
    const resp = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blog = resp.body[0]

    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
})

test("Testing append of blog in DB", async () => {
    const newBlog = {
        "title": "Third Blog",
        "author": "Soham",
        "url": "tata.txt",
        "likes": 2
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const resp = await api.get('/api/blogs')
    const titles = resp.body.map(b => b.title)

    assert.strictEqual(resp.body.length, helper.initialBlogs.length + 1)
    assert(titles.includes(newBlog.title))
    
})

test("Testing the missing value of likes", async () => {
    const newBlog = {
        "title": "Third Blog",
        "author": "Soham",
        "url": "tata.txt",
    }

    const resp = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(resp.body.likes, 0)

})

describe("Missing important variables", () => {
    const missingTitle = {
        "author": "Missing Title",
        "url": "tata.txt",
        "likes": 5
    }

    const missingURL = {
        "title": "Missing URL",
        "author": "Soham",
        "likes": 5
    }

    test("Missing Title", async () => {
        await api
        .post("/api/blogs")
        .send(missingTitle)
        .expect(400)
    })

    test("Missing URL", async () => {
        await api
        .post("/api/blogs")
        .send(missingURL)
        .expect(400)
    })
})

test("Deleting Blog", async () => {
    const blogs = await helper.blogsInDB()
    const blogToDelete = blogs[0] 

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const updatedBlogs = await helper.blogsInDB()
    assert(!updatedBlogs.map(blog => blog.id).includes(blogToDelete.id))

    assert.strictEqual(updatedBlogs.length, helper.initialBlogs.length-1)
})

test("Updating Blog", async () => {
    const blogs = await helper.blogsInDB()
    const blogToUpdate = blogs[0]

    const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
    }

    const resp = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(resp.body.likes, updatedBlog.likes)
})

after(async () => {
    await mongoose.connection.close()
})
