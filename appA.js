const axios = require('axios')
const { spawn } = require('child_process')

function startB() {
    const appB = spawn('node', ['appB'])
    appB.stdout.on("data", data => {
        console.log(`${data}`)
    })
    appB.stderr.on("data", data => {
        console.log(`${data}`)
    })
    appB.on("error", (error) => {
        console.log(`${error.message}`)
    })
    appB.on("close", (error) => {
        console.log('closed')
    })
}

function reqB() {
    axios.get('http://localhost:3113/reqB')
        .then(res => console.log(res.data))
        .catch(err => console.log(`AppB is stopped (reqB)`))
}

function stopB() {
    axios.get('http://localhost:3113/stopB')
        .then(res => console.log(res.data))
        .catch(err => console.log(`AppB is stopped (stopB)`))
}

let state = 0
setInterval(() => {
    if (state == 0) {
        state = 1
        startB()
    } else if(state == 1){
        state = 2
        reqB()
    } else {
        state = 0
        stopB()
    }
}, 5000)


