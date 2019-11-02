import User from './app/controller/UserController'
import Session from './app/controller/SessionController'
import FileCtrl from './app/controller/FileController'
import authMiddleware from './app/middlewares/auth'
import multer from 'multer'
import multerConfig from './config/multer'

const { Router } = require('express')

const routes = new Router()
const upload = multer(multerConfig)

routes.get('/', (req, res) => {
    res.send('ok')
})

routes.post('/users', User.store)
routes.post('/sessions', Session.store)

routes.use(authMiddleware)
routes.put('/users', User.update)

routes.post('/files', upload.single('file'), FileCtrl.store)

module.exports = routes