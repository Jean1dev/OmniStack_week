const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const _post = require('./models/post')
const _tweet = require('./controllers/tweetController')
const _likes = require('./controllers/likeControllers')
const _box = require('./controllers/boxController')
const _files = require('./controllers/fileController')
const _dev = require('./controllers/devController')
const _search = require('./controllers/SearchDevController')

routes.post('/dev', _dev.store)
routes.get('/dev', _dev.findAll)
routes.get('/search', _search.index)

routes.post('/boxes', _box.store)
routes.get('/boxes/:id', _box.show)

routes.post('/boxes/:id/files', multer(multerConfig).single('file'), _files.store)

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

routes.post('/posts', multer(multerConfig.resolver).single('file'), async (req, res) => {
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