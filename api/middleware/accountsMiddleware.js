const Account = require('../models/accountsModel')

function validateData() {
    return (request, response, next) => {
        let data = request.body
        let account = {
            name: data.name,
            budget: data.budget
        }

        if(!account.name) {
            response.status(400).json({"message": "name is required"})
        }
        else if(!account.budget) {
            response.status(400).json({"message": "budget is required"})
        }
        else {
            request.accountData = data
            next()
        }
    }
}

function validateID() {
    return async (request, response, next) => {
        let id = request.params.id
        try {
            let account = await Account.get(id)

            if (account) {
                request.account = account
                next()
            } else {
                response.status(404).json({"message": "user not found"})
            }
        }
        catch (error) {
            response.status(500).json({"message": "something went wrong"})
        }
    }
}

module.exports = {
    validateData,
    validateID
}
