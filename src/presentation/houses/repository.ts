import { House } from "./interface";
import * as mockHouses from "../../data/MockHouses.json";

export interface IHouseRepository {
    getHouses(): Promise<House[]>;
    getHouseById(id: number): Promise<House | undefined>;
    createHouse(house: House): Promise<House>;
    updateHouse(id: number, updatedHouse: Partial<House>): Promise<House | undefined>;
    deleteHouse(id: number): Promise<number | undefined>;
}

export class HouseRepository implements IHouseRepository {

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

        const { description, value, area, status, images, location, features, isFavorite } = houses[houseIndex]!;
        const newHouse: House = {
            id: id,
            description: updatedHouse.description ?? description,
            value: {
                amount: updatedHouse.value?.amount ?? value.amount,
                currency: updatedHouse.value?.currency ?? value.currency,
                expenses: updatedHouse.value?.expenses ?? value.expenses
            },
            area: {
                totalArea: updatedHouse.area?.totalArea ?? area.totalArea,
                coveredArea: updatedHouse.area?.coveredArea ?? area.coveredArea,
                unit: updatedHouse.area?.unit ?? area.unit
            },
            status: updatedHouse.status ?? status,
            images: updatedHouse.images ?? images,
            location: {
                neighborhood: updatedHouse.location?.neighborhood ?? location.neighborhood,
                locality: updatedHouse.location?.locality ?? location.locality,
                googleMapsLink: updatedHouse.location?.googleMapsLink ?? location.googleMapsLink
            },
            features: {
                rooms: updatedHouse.features?.rooms ?? features.rooms,
                bathrooms: updatedHouse.features?.bathrooms ?? features.bathrooms,
                age: updatedHouse.features?.age ?? features.age,
                type: updatedHouse.features?.type ?? features.type
            },
            isFavorite: updatedHouse.isFavorite ?? isFavorite
        };

        houses[houseIndex] = newHouse;
        return newHouse;
    }

    public async deleteHouse(id: number): Promise<number | undefined> {
        const houses = await this.getHouses();
        const houseIndex = houses.findIndex(house => house.id === id);
        if (houseIndex === -1) return undefined;

        houses.splice(houseIndex, 1);
        return id; 
    }

    // public async getHouseByNeighborhood(neighborhood: string): Promise<House[]> {
    //     const houses = await this.getHouses();
    //     return houses.filter(house => house.location.neighborhood.toLowerCase() === neighborhood.toLowerCase());
    // }

}