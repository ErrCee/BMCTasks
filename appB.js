const express = require('express')
const app = express()
const port = 3113 || env.process.PORT

const reqB = (req, res) => {
    console.log('------ accepting requests -----')
    res.send({status: 'listening'})
}

const stopB = (req, res) => {
    console.log('------ stopping -----')
    res.send({status: 'stopped'})
    process.exit()
}

app.get('/reqB', reqB)
app.get('/stopB', stopB)

app.listen(port, () => {
    console.log(`appB listening at http://localhost:${port}`)
})
