const express = require('express')
const Account = require('../models/accountsModel')
const {validateID, validateData} = require('../middleware/accountsMiddleware')

const router = express.Router()

router.get('/accounts', async (request, response) => {
    try {
        let account = await Account.get()

        return response.status(200).json(account)
    } catch (error) {
        return response.status(500).json({"message": "error unable to get"})
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
        return response.status(500).json({"message": "error unable to insert"})
    }
})

router.put('/accounts/:id', validateData(), validateID(), async (request, response) => {
    let id = request.params.id
    let data = request.accountData

    try {
        let account = await Account.edit(id, data)

        return response.status(200).json(account)
    } catch (error) {
        return response.status(500).json({"message": "error unable to update"})
    }
})

router.delete('/accounts/:id', validateID(), async (request, response) => {
    try {
        let result = await Account.remove(request.account.id)

        return response.status(200).json(result)
    } catch (error) {
        return response.status(500).json({"message": "error unable to delete"})
    }
})

module.exports = router
