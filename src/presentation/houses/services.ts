import { House } from "./interface";
import { HouseRepository } from "./repository";


export class HouseServices {

    public async getHouses(): Promise<House[]> { 
        const houses: House[] = await new HouseRepository().getHouses();
        const arrayHouses: House[] = Array.isArray(houses) ? houses : Object.values(houses);
        return arrayHouses;
    }

    public async getHouseById(id: number): Promise<House | undefined> {
        return await new HouseRepository().getHouseById(id);
    }

    public async createHouse(house: House): Promise<House> {
        return await new HouseRepository().createHouse(house);
    }

    public async updateHouse(id: number, updatedHouse: Partial<House>): Promise<House | undefined> {
        return await new HouseRepository().updateHouse(id, updatedHouse);
    }

    public async deleteHouse(id: number): Promise<number | undefined> {
        return await new HouseRepository().deleteHouse(id);
    }

    public async getHousesByNeighborhood(neighborhood: string): Promise<House[]> {
        const houses: House[] = await this.getHouses();
        return houses.filter(house => house.location.neighborhood.toLowerCase() === neighborhood.toLowerCase());
    }

}