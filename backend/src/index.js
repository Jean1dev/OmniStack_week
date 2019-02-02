const express = require(`express`)
const morgan = require(`morgan`)
const db = require('./config/db.config.js')
const path = require('path')

const app = express()

db()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
app.use(require(`./routes`))

app.listen(3000)