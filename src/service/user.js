import { methods as userRepository } from "../repository/user"
import User from "../model/user";

const getUser = async (id) => {
    try {
        const result = await userRepository.getUser(id);
        // handle user not found
        const user = result[0][0];
        return new User(user.id, user.name, user.surname, user.email);;
    } catch(e) {
        console.error(e);
    }
}

const updateUser = async (fields, id) => {
    // Validate that al least one field arrives
    try {
        const userUpdated = await userRepository.updateUser(fields,id);
        const result = await userRepository.getUser(id);
        const user = result[0][0];
        return new User(user.id, user.name, user.surname, user.email);;
    } catch(e) {
        console.error(e);
    }
}

export const methods = {
    getUser,
    updateUser
}