const errors = require('../helpers/errorMessage')

const errorMiddleware = (err, req, res, next) => {
    console.error(err, 'error desde el middleware')
    const errorDetail = errors[err.message] || errors['SERVER_ERROR']

    const response = {
        id: errorDetail.id,
        message: errorDetail.message,
        description: errorDetail.description
    }

    res.status(errorDetail.statusCode).json(response)
 
}

module.exports = errorMiddleware;