import { prisma } from "../../data/postgres";
import { CreateCasaDto, UpdateCasaDto } from "../../domain/dtos";
import { Casa } from "./interface";


export class CasaRepository {

    public async getCasas(): Promise<Casa[]> {

        const casas = await prisma.casa.findMany();
        
        return casas.map(casa => ({
            id: casa.id,
            descripcion: casa.descripcion,
            barrio: casa.barrio,
            valor: casa.valor.toString()
        }));

    }

    public async getCasaById(id: number): Promise<Casa | null> {
        const casa = await prisma.casa.findUnique({
            where: { id }
        });

        if (!casa) {
            return null;
        }

        return {
            id: casa.id,
            descripcion: casa.descripcion,
            barrio: casa.barrio,
            valor: casa.valor.toString()
        };
    }

    public async createCasa(casa: CreateCasaDto): Promise<number> {
       
        const createdCasa = await prisma.casa.create({
            data: {
                descripcion: casa.descripcion,
                barrio: casa.barrio,
                valor: casa.valor ?? 0
            }
        });

        return createdCasa.id

    }

    public async updateCasa(id: number, updateCasa: UpdateCasaDto): Promise<boolean> {
        const updatedCasa = await prisma.casa.update({
            where: { id },
            data: updateCasa.values
        });

        return updatedCasa !== null;
    }

    public async deleteCasa(id: number): Promise<boolean> {
        const deletedCasa = await prisma.casa.delete({
            where: { id }
        });

        return deletedCasa !== null;
    }

}