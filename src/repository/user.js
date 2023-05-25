import { getConnection } from "../database/database";

const getUsers = async () => {
    try {
        const connection = await getConnection();
        return await connection.query("SELECT * FROM user");
    } catch(e) {
        throw e;
    }
}

const getUser = async (id) => {
    try {
        const connection = await getConnection();
        return await connection.query("SELECT * FROM user WHERE id = ?", [id]);
    } catch(e) {
        throw e;
    }
}

const addUser = async (user) => {
    try {
        const connection = await getConnection();
        return await connection.query("INSERT INTO user SET ?", [user]);
    } catch(e) {
        throw e;
    }
}

const updateUser = async (fields, id) => {
    try {
        const connection = await getConnection();
        await connection.query("UPDATE user SET ? WHERE id = ?", [fields, id]);
        return true;
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