const express = require("express")
const accountRoutes = express.Router();
const fs = require('fs');

const dataPath = './details/useraccount.json'

const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)
}

// POST - Add Account
accountRoutes.post('/account', (req, res) => {
    var existAccounts = getAccountData()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
    existAccounts[newAccountId] = req.body
    console.log(existAccounts);
    saveAccountData(existAccounts);
    res.send({ success: true, msg: 'account data added successfully' })
})

// GET - Read Account Info
accountRoutes.get('/account', (req, res) => {
    const accounts = getAccountData()
    res.send(accounts)
})

// PUT - Update Account Info
accountRoutes.put('/account/:id', (req, res) => {
    var existAccounts = getAccountData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
        const accountId = req.params['id'];
        existAccounts[accountId] = req.body;

        saveAccountData(existAccounts);
        res.send(`accounts with id ${accountId} has been updated`)
    }, true);
});

// DELETE - Delete Account Info
accountRoutes.delete('/account/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        var existAccounts = getAccountData()

        const userId = req.params['id'];

        delete existAccounts[userId];
        saveAccountData(existAccounts);
        res.send(`accounts with id ${userId} has been deleted`)
    }, true);
})

module.exports = accountRoutes