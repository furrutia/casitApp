import { Router } from "express";
import { HouseRoutes } from "./houses/routes";
import { UserRoutes } from "./users/routes";

export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        router.use('/api/users', UserRoutes.routes);
        router.use('/api/houses', HouseRoutes.routes);
        return router;
    }

}