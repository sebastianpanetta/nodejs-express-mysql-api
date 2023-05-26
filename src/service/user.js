import { methods as userRepository } from "../repository/user"
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';
import User from "../model/user";
import Error from "../model/error";

const getUsers = async () => {
    try {
        const result = await userRepository.getUsers();
        return result[0];
    } catch(e) {
        throw e;
    }
}

const getUser = async (id) => {
    try {
        const result = await userRepository.getUser(id);
        if (result[0].length == 0) {
            throw new Error(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, `User not found for id: ${id}`);
        }
        const user = result[0][0];
        return new User(user.id, user.name, user.surname, user.email);;
    } catch(e) {
        throw e;
    }
}

const addUser = async (user) => {
    try {
        const result = await userRepository.addUser(user);
        user.id = result[0].insertId;
        return user;
    } catch(e) {
        throw e;
    }
}

const updateUser = async (fields, id) => {
    try {
        await userRepository.updateUser(fields,id);
        const result = await userRepository.getUser(id);
        return result[0][0];
    } catch(e) {
        throw e;
    }
}

const deleteUser = async (id) => {
    try {
        await userRepository.deleteUser(id)
    } catch(e) {
        throw e;
    }
}

export const methods = {
    getUsers: getUsers,
    getUser: getUser,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}