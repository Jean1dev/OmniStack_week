const express = require('express')
const session = require('./controllers/SessionController')
const spot = require('./controllers/SpotController')

const routes = express.Router()

routes.post('/session', session.store)

routes.post('/spot', spot.store)

module.exports = routes