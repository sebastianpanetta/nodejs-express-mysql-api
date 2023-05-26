module.exports = class Error {
    constructor(httpStatus, message, description) {
        this.httpStatus = httpStatus;
        this.message = message;
        this.description = description;
    }

    getMessage() {
        return {
            message: this.message,
            description: this.description
        }
    }
}