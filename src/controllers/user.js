import { getConnection } from "../database/database";
import User from "../model/user";

const getUsers = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM user");
        console.log(result[0]);
        res.json(result[0]);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error",
            error
        });
    }
};

const getUser = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM user WHERE id = ?", [id]);
        if (!result[0].length) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        console.log(result[0]);
        res.json(result[0]);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error",
            error
        });
    }
};

const addUser = async (req, res) => {
    try {
        const user = new User(null, req.body.name, req.body.surname, req.body.email);

        if (!user.name || !user.surname || !user.email) {
            return res.status(400).json({
                message: "Bad request"
            });
        }

        const connection = await getConnection();
        const result = await connection.query("INSERT INTO user SET ?", [user]);
        console.log(result);
        res.json({
            message: "User added",
            id: result[0].insertId
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error",
            error
        });
    }
};

const updateUser = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Bad request"
            });
        }

        const connection = await getConnection();

        let result = await connection.query("SELECT * FROM user WHERE id = ?", [id]);
        if (!result[0].length) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        result = await connection.query("UPDATE user SET ? WHERE id = ?", [req.body, id]);
        console.log(result[0]);
        res.json({
            message: "User updated",
            id
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error",
            error
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();

        let result = await connection.query("SELECT * FROM user WHERE id = ?", [id]);
        
        if (!result[0].length) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        result = await connection.query("DELETE FROM user WHERE id = ?", [id]);
        console.log(result[0]);
        res.json({
            message: "User deleted",
            id
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error",
            error
        });
    }
};

export const methods = {
    getUsers: getUsers,
    getUser: getUser,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};