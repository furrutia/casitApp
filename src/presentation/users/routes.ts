import { Router } from "express";
import { UserController } from "./controller";
import { UserRepository } from "./repository";
import { UserService } from "./services";


export class UserRoutes {

    static get routes(): Router {

        const router = Router();
        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);
        const userController = new UserController(userService);

        router.get('/', userController.getUsers);
        router.post('/login', userController.login);
        router.post('/', userController.create);
        router.put('/:id', userController.update);
        router.delete('/:id', userController.delete);
        
        return router;

    }

}