import { Request, Response } from "express";
import { CreateCasaDto, UpdateCasaDto } from "../../domain/dtos";
import { House } from "./interface"; 
import { HouseServices } from "./services";

export class HouseController {

    constructor(){}

    public getHouses = async(req: Request, res: Response) => {
        const houses: House[] = await new HouseServices().getHouses();
        res.json(houses);
    }

    public getHouseById = async(req: Request, res: Response) => {

        if (!req.params.id) {
            return res.status(400).json({ message: "House ID is required" });
        }

        const id: number = parseInt(req.params.id);
        const house: House | undefined = await new HouseServices().getHouseById(id);
        if (!house) {
            return res.status(404).json({ message: "House not found" });
        }
        res.json(house);
    }

    public createHouse = async(req: Request, res: Response) => {

        if (!req.body) {
            return res.status(400).json({ message: "House data is required" });
        }

        const houseData: House = req.body;
        const newHouse: House = await new HouseServices().createHouse(houseData!);
        res.status(201).json(newHouse);
    }

    public updateHouse = async(req: Request, res: Response) => {

        if (!req.params.id) {
            return res.status(400).json({ message: "House ID is required" });
        }

        const id: number = parseInt(req.params.id);
        const updatedHouseData: UpdateCasaDto = req.body;
        const updatedHouse: House | undefined = await new HouseServices().updateHouse(id, updatedHouseData);
        if (!updatedHouse) {
            return res.status(404).json({ message: "House not found" });
        }
        res.json(updatedHouse);
    }

}