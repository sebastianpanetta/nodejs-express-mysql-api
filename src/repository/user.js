import { getConnection } from "../database/database";

const getUser = async (id) => {
    try {
        const connection = await getConnection();
        return await connection.query("SELECT * FROM user WHERE id = ?", [id]);
    } catch(e) {
        console.error(e);
        throw new Error(`Error getting user with id: ${id}`);
    }
}

const updateUser = async (fields, id) => {
    try {
        const connection = await getConnection();
        await connection.query("UPDATE user SET ? WHERE id = ?", [fields, id]);
        return true;
    } catch(e) {
        console.error(e);
        throw new Error(`Error updating user with id: ${id}`);
    }
}

export const methods = {
    getUser,
    updateUser
}