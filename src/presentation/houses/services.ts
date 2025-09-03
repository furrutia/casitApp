import { House } from "./interface";
import { IHouseRepository } from "./repository";

export interface IHouseService {
    getHouses(): Promise<House[]>;
    getHouseById(id: number): Promise<House | undefined>;
    createHouse(house: House): Promise<House>;
    updateHouse(id: number, updatedHouse: Partial<House>): Promise<House | undefined>;
    deleteHouse(id: number): Promise<number | undefined>;
    getHousesByNeighborhood(neighborhood: string): Promise<House[]>;
}

export class HouseService implements IHouseService {

    constructor(private repository: IHouseRepository){}

    public async getHouses(): Promise<House[]> { 
        const houses: House[] = await this.repository.getHouses();
        const arrayHouses: House[] = Array.isArray(houses) ? houses : Object.values(houses);
        return arrayHouses;
    }

    public async getHouseById(id: number): Promise<House | undefined> {
        return await this.repository.getHouseById(id);
    }

    public async createHouse(house: House): Promise<House> {
        return await this.repository.createHouse(house);
    }

    public async updateHouse(id: number, updatedHouse: Partial<House>): Promise<House | undefined> {
        return await this.repository.updateHouse(id, updatedHouse);
    }

    public async deleteHouse(id: number): Promise<number | undefined> {
        return await this.repository.deleteHouse(id);
    }

    public async getHousesByNeighborhood(neighborhood: string): Promise<House[]> {
        const houses: House[] = await this.getHouses();
        return houses.filter(house => house.location.neighborhood.toLowerCase() === neighborhood.toLowerCase());
    }

}