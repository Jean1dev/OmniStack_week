import path from 'path'
import express from 'express'
import routes from './routes'
import cors from 'cors'
import './database'
import * as Sentry from '@sentry/node'
import sentryConfig from './config/sentry'
import Youch from 'youch'
import 'express-async-errors'

class App {

    constructor() {
        this.server = express()
        this.monitoring()
        this.middlewares()
        this.routes()
        this.exceptionHandler()
    }

    monitoring() {
        Sentry.init(sentryConfig)
        this.server.use(Sentry.Handlers.requestHandler())
    }

    middlewares() {
        this.server.use(cors())
        this.server.use(express.json())
        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')))
    }

    routes() {
        this.server.use(routes)
        this.server.use(Sentry.Handlers.errorHandler())
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            const errors = await new Youch(err, req).toJSON()
            console.log(errors)

            return res.status(500).json({ error: 'Internal server error' })
        })
    }
}

module.exports = new App().server