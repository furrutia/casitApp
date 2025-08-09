import { Router } from "express";
import { HouseRoutes } from "./houses/routes";

export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        router.use('/api/houses', HouseRoutes.routes);
        return router;
    }

}