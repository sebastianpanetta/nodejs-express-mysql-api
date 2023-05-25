import Error from "../model/error";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';

const validateIdParam = (req, res, next) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        const error = new Error(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, "Id must be an int");
        return res.status(error.httpStatus).json(error.getMessage());
    }

    next();
}

const validateCreateUserFields = (req, res, next) => {
    if (!req.body.name || !req.body.surname || !req.body.email) {
        const error = new Error(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, "Missing fields");
        return res.status(error.httpStatus).json(error.getMessage());
    }

    next();
}

export const methods = {
    validateIdParam: validateIdParam,
    validateCreateUserFields: validateCreateUserFields
}