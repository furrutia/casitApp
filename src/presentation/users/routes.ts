import { Router } from "express";
import { UserController } from "./controller";


export class UserRoutes {

    static get routes(): Router {

        const router = Router();
        const userController = new UserController();

        router.get('/', userController.list);
        router.post('/login', userController.login);
        router.post('/', userController.create);
        router.put('/:id', userController.update);
        router.delete('/:id', userController.delete);
        
        return router;

    }

}