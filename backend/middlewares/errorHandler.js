const { ValidationError } = require('joi');

const errorHandler = (error, req, res, next) => {
    // Default error
    let status = 500;
    let data = {
        message: 'Internal server error'
    };

    if (error instanceof ValidationError) {
        status = error.status || 400; // Typically, validation errors are 400 Bad Request
        data.message = error.message;
    } else {
        if (error.status) {
            status = error.status;
        }
        if (error.message) {
            data.message = error.message;
        }
    }

    return res.status(status).json(data);
};

module.exports = errorHandler;
