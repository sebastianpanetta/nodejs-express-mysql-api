import Error from "../model/error";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';

const handleError = (error) => {
    console.error(error);
    if (error instanceof Error) {
        return error;
    }
    return new Error(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, "Internal Server Error");
}

export const methods = {
    handleError: handleError
}