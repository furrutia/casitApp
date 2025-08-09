import { House } from "./interface";
import * as mockHouses from "../../data/MockHouses.json";

export class HouseRepository {

    public async getHouses(): Promise<House[]> {
        return new Promise((resolve) => {
            resolve((mockHouses as any).default as House[]);
        });
    }

    public async getHouseById(id: number): Promise<House | undefined> {
        const houses = await this.getHouses();
        return houses.find(house => house.id === id);
    }

    public async createHouse(house: House): Promise<House> {
        const houses = await this.getHouses();
        const newId = houses.length ? Math.max(...houses.map(h => h.id)) + 1 : 1; // Assign new ID
        const newHouse: House = { ...house, id: newId };
        houses.push(newHouse);
        return newHouse;
    }

    public async updateHouse(id: number, updatedHouse: Partial<House>): Promise<House | undefined> {
        const houses = await this.getHouses();
        const houseIndex = houses.findIndex(house => house.id === id);
        if (houseIndex === -1) return undefined;

        const { description, value, expenses, status, images, location, features } = houses[houseIndex]!;
        const newHouse: House = {
            id: id,
            description: updatedHouse.description ?? description,
            value: updatedHouse.value ?? value,
            expenses: updatedHouse.expenses ?? expenses,
            status: updatedHouse.status ?? status,
            images: updatedHouse.images ?? images,
            location: updatedHouse.location ?? location,
            features: updatedHouse.features ?? features
        };

        houses[houseIndex] = newHouse;
        return newHouse;
    }

}