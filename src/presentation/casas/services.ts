import { CreateCasaDto, UpdateCasaDto } from "../../domain/dtos";
import { CasaRepository } from "./repository";

export class CasaService {

    // private casas = [
    //     {'id': 1, 'descripcion': 'CASA 1', 'barrio': 'BARRIO 1', 'valor': '500'},
    //     {'id': 2, 'descripcion': 'CASA 2', 'barrio': 'BARRIO 1', 'valor': '1500'},
    //     {'id': 3, 'descripcion': 'CASA 3', 'barrio': 'BARRIO 2', 'valor': '2500'},
    // ];

    public async getCasas() {
        
        const casas = await new CasaRepository().getCasas();
        return casas;
    }

    public async getCasaById(id: number) {
        return await new CasaRepository().getCasaById(id);
    }

    public async createCasa(casa: CreateCasaDto) {
        return await new CasaRepository().createCasa(casa);
    }

    public async updateCasa(id: number, updateCasa: UpdateCasaDto) {
        const result = await new CasaRepository().updateCasa(id, updateCasa);
        return result;
    }

    public deleteCasa(id: number) {
        return new CasaRepository().deleteCasa(id);
    }

    public async getCasasByBarrio(barrio: string) {
        const casas = await new CasaRepository().getCasas();
        return casas.filter(casa => casa.barrio === barrio);
    }

    public async getCasasByValor(valor: string) {
        const casas = await new CasaRepository().getCasas();
        return casas.filter(casa => casa.valor === valor);
    }


}