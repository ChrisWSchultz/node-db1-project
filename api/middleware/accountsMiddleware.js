const Account = require('../models/accountsModel')

function validateData() {
    return (request, response, next) => {
        let message = ''
        let data = request.body
        let account = {
            name: data.name,
            budget: data.budget
        }

        if(!account.name) {
            message = {"message": "name is required"}
        }
        else if(!account.budget) {
            message = {"message": "budget is required"}
        }
        else {
            request.accountData = data
            next()
        }

        return response.status(400).json(message)
    }
}

function validateID() {
    return async (request, response, next) => {
        let id = request.params.id
        try {
            let account = await Account.get(id)

            if (!account) {
                return response.status(404).json({"message": "user not found"})
            } else {
                request.account = account
                next()
            }
        }
        catch (error) {
            return response.status(500).json({"message": "something went wrong"})
        }
    }
}

module.exports = {
    validateData,
    validateID
}
