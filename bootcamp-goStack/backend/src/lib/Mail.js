import nodemailer from 'nodemailer'
import config from '../config/mail'
import exphbs from 'express-handlebars'
import nodemailerhbs from 'nodemailer-express-handlebars'
import { resolve } from 'path'

class Mail {

    constructor() {
        const { host, port, secure, auth } = config
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: auth.user ? auth : null
        })

        this.configure()
    }

    configure() {
        const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails')

        this.transporter.use('compile', nodemailerhbs({
            viewEngine: exphbs.create({
                layoutsDir: resolve(viewPath, 'layouts'),
                partialsDir: resolve(viewPath, 'partials'),
                defaultLayout: 'default',
                extname: '.hbs'
            }),
            viewPath,
            extName: '.hbs'
        }))
    }

    sendMail(message) {
        return this.transporter.sendMail({
            ...config.default,
            ...message
        })
    }
}

export default new Mail()