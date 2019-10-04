const express = require('express')
const routes = require('./routes')

const port = 3333

const app = express()

// mongoose.connect('mongodb+srv://default:default@jaguardb-e7nlh.mongodb.net/default?retryWrites=true&w=majority', 
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`listem on port`, port)
})