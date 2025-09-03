import { Router } from "express";
import { HouseController } from "./controller";
import { HouseRepository } from "./repository";
import { HouseService } from "./services";


export class HouseRoutes {

    static get routes(): Router {

        const router = Router();
        const houseRepository = new HouseRepository();
        const houseService = new HouseService(houseRepository);
        const houseController = new HouseController(houseService);

        router.get('/', houseController.getHouses);
        router.get('/:neighborhood', houseController.getHousesByNeighborhood);
        router.get('/:id', houseController.getHouseById);
        router.post('/', houseController.createHouse);
        router.put('/:id', houseController.updateHouse);
        
        return router;

    }

}