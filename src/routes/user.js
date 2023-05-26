import { Router } from "express";
import { methods as userController } from "../controllers/user";
import { methods as userMiddleware } from "../middlewares/user";

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userMiddleware.validateIdParam, userController.getUser);
router.post('/', userMiddleware.validateCreateUserFields, userController.addUser);
router.put('/:id', userMiddleware.validateIdParam, userMiddleware.validateUpdateUserFields, userController.updateUser);
router.delete('/:id', userMiddleware.validateIdParam, userController.deleteUser);

export default router;