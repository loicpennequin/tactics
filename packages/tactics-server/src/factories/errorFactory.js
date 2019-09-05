
class CustomError extends Error {
    constructor(message, name, httpError, originalError, details) {
        super(message);
        Object.assign(this, {
            message,
            name,
            httpError,
            originalError,
            details
        });
    }
}

export default {
    unauthorized: (message = 'Authentication is required.', originalError) =>
        new CustomError(message, 'Unauthorized', 401, originalError),
    internalServerError: (message = 'Internal server error.', originalError) =>
        new CustomError(message, 'InternalServerError', 500, originalError),
    invalidField: (message = 'A field is invalid', originalError) =>
        new CustomError(message, 'ValidationError', 422, originalError),
    tokenExpired: (message = 'Token is expired', originalError) =>
        new CustomError(message, 'Unauthorized', 401, originalError)
};