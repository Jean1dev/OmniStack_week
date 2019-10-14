import User from './app/controller/UserController'
import Session from './app/controller/SessionController'
import authMiddleware from './app/middlewares/auth'

const { Router } = require('express')

const routes = new Router()

routes.get('/', (req, res) => {
    res.send('ok')
})

routes.post('/users', User.store)
routes.post('/sessions', Session.store)

routes.use(authMiddleware)
routes.put('/users', User.update)

module.exports = routes