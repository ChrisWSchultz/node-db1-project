const express = require('express')

const Account = require('../models/accountsModel')

const {validateID, validateData} = require('../middleware/accountsMiddleware')

const router = express.Router()

router.get('/accounts', async (request, response) => {
    try {
        let account = await Account.get()

        return response.status(200).json(account)
    } catch (error) {
        return response.status(500).json({"message": "something went wrong"})
    }
})

router.get('/accounts/:id', validateID(), async (request, response) => {
    return response.status(200).json(request.account)
})

router.post('/accounts', validateData(), async (request, response) => {
    try {
        let account = await Account.insert(request.accountData)

        return response.status(200).json(account)
    } catch (error) {
        return response.status(500).json({"message": "something went wrong"})
    }
})

router.put('/accounts/:id', validateData(), validateID(), async (request, response) => {
    return response.status(200).json({"message": "hello world"})
})

router.delete('/accounts/:id', validateID(), async (request, response) => {
    return response.status(200).json({"message": "hello world"})
})

module.exports = router
