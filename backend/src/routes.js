const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const _post = require('./models/post')
const _tweet = require('./controllers/tweetController')
const _likes = require('./controllers/likeControllers')

routes.get('/tweets', _tweet.list)
routes.post('/tweets', _tweet.store)

routes.post('/likes/:id', _likes.store)

routes.get('/posts', async(req, res) => {
    const posts = await _post.find()
    return res.json(posts)
})

routes.delete('/posts/:id', async (req, res) => {
    const post = await _post.findById(req.params.id)
    await post.remove()
    return res.send("ok")
})

routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, filename: key, location: url = ""} = req.file

    const post = await _post.create({
        name,
        size,
        key,
        url: ''
    })
    return res.json({post})
})

module.exports = routes