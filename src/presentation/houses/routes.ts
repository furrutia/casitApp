import { Router } from "express";
import { HouseController } from "./controller";


export class HouseRoutes {

    static get routes(): Router {

        const router = Router();
        const houseController = new HouseController();

        router.get('/', houseController.getHouses);
        // router.get('/barrio', casaController.getCasasByBarrio);
        // router.get('/valor', casaController.getCasasByValor);
        // router.get('/barrio-valor', casaController.getCasasByBarrioAndValor);
        router.get('/:id', houseController.getHouseById);
        router.post('/', houseController.createHouse);
        router.put('/:id', houseController.updateHouse);
        // router.delete('/:id', casaController.deleteCasa);
        
        return router;

    }

}