import { Router } from "express";
import { CasaRoutes } from "./casas/routes";

export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        router.use('/api/casas', CasaRoutes.routes);
        return router;
    }

}