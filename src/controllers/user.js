import { getConnection } from "../database/database";
import { methods as userService } from "../service/user"; 
import User from "../model/user";

const getUsers = async (_, res) => {
    try {
        const users = await userService.getUsers();
        console.log(users);
        res.json(users);
    } catch(e) {
        console.error(e);
        res.status(500).json({
            message: "Error getting users",
        });
    }
};

const getUser = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const user = await userService.getUser(id);
        console.log(user);
        res.json(user);
    } catch(e) {
        console.error(e);
        res.status(500).json({
            message: "Error getting user",
        });
    }
};

const addUser = async (req, res) => {
    try {
        let user = new User(null, req.body.name, req.body.surname, req.body.email);

        user = await userService.addUser(user);

        console.log(user);
        res.json({
            message: "User added",
            user: user
        });
    } catch(e) {
        console.error(e);
        res.status(500).json({
            message: "Error creating user",
        });
    }
};

const updateUser = async (req, res) => {
    try {

        const { id } = req.params;

        let user = await userService.getUser(id);
        user = await userService.updateUser(req.body, id);
        
        res.json({
            message: "User updated",
            user: user
        })
    } catch(e) {
        console.error(e);
        res.status(500).json({
            message: "Error updating user",
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
    } catch(e) {
        console.error(e);
        res.status(500).json({
            message: "Error deleting user",
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