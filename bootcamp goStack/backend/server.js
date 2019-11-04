require('dotenv-extended').load()
const app = require('./src/app')
const port = process.env.APPLICATION_PORT || 3333

app.listen(port, () => {
    console.log('listem on port', port)
})