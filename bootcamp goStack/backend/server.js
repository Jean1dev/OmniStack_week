require('dotenv-extended').load()
const app = require('./src/app')
const port = 3333

app.listen(port, () => {
    console.log('listem on port', port)
})