import { Router } from "express";
import { CasaController } from "./controller";


export class CasaRoutes {

    static get routes(): Router {

        const router = Router();
        const casaController = new CasaController();

        router.get('/', casaController.getCasas);
        router.get('/barrio', casaController.getCasasByBarrio);
        router.get('/valor', casaController.getCasasByValor);
        router.get('/barrio-valor', casaController.getCasasByBarrioAndValor);
        router.get('/:id', casaController.getCasaById);
        router.post('/', casaController.createCasa);
        router.put('/:id', casaController.updateCasa);
        router.delete('/:id', casaController.deleteCasa);
        
        return router;

    }

}