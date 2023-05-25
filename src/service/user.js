import { methods as userRepository } from "../repository/user"
import User from "../model/user";

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
        // handle user not found
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
    // Validate that al least one field arrives
    try {
        const userUpdated = await userRepository.updateUser(fields,id);
        const result = await userRepository.getUser(id);
        const user = result[0][0];
    } catch(e) {
        throw e;
    }
}

export const methods = {
    getUsers,
    getUser,
    addUser,
    updateUser
}