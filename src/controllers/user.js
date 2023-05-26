import { methods as userService } from "../service/user"; 
import { methods as errorHandler } from "./errorHandler";
import User from "../model/user";

const getUsers = async (_, res) => {
    try {
        const users = await userService.getUsers();
        console.log(users);
        res.json(users);
    } catch(e) {
        const error = errorHandler.handleError(e);
        res.status(error.httpStatus).json(error.getMessage());
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
        const error = errorHandler.handleError(e);
        res.status(error.httpStatus).json(error.getMessage());
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
        const error = errorHandler.handleError(e);
        res.status(error.httpStatus).json(error.getMessage());
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
        const error = errorHandler.handleError(e);
        res.status(error.httpStatus).json(error.getMessage());
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userService.getUser(id);
        await userService.deleteUser(id);
        res.json({
            message: "User deleted",
            id
        })
    } catch(e) {
        const error = errorHandler.handleError(e);
        res.status(error.httpStatus).json(error.getMessage());
    }
};

export const methods = {
    getUsers: getUsers,
    getUser: getUser,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};