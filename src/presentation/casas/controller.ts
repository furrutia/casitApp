import { Request, Response } from "express";
import { CasaService } from "./services";
import { CreateCasaDto, UpdateCasaDto } from "../../domain/dtos"; 

export class CasaController {

    constructor(){}

    public getCasas = async(req: Request, res: Response) => {

        const casas = await new CasaService().getCasas();
        res.json(casas);

    }

    public getCasaById = async(req: Request, res: Response) => {

        if (!req.params.id) {
            return res.status(400).json({ message: 'ID parameter is required' });
        }

        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: `Invalid ID` });

        const casa = await new CasaService().getCasaById(id);

        (casa) 
            ? res.json(casa)
            : res.status(404).json({ message: 'Casa not found' });

    }

    public createCasa = async(req: Request, res: Response) => {

        const [ errors, createCasaDTO ] = CreateCasaDto.create(req.body);

        if (errors && errors.length > 0) return res.status(400).json({ errors });

        const id = await new CasaService().createCasa(createCasaDTO!);
        res.status(201).json({id});
    }

    public updateCasa = async(req: Request, res: Response) => {

        const id = parseInt(req.params.id!, 10);
        if (isNaN(id)) return res.status(400).json({ message: `Invalid ID` });

        const [ errors, updateCasaDTO ] = UpdateCasaDto.create({id, ...req.body});

        if (errors && errors.length > 0) return res.status(400).json({ errors });

        const success = await new CasaService().updateCasa(id, updateCasaDTO!);

        (success)
            ? res.json({ message: `Casa with id ${id} updated successfully` })
            : res.status(404).json({ message: `Casa with id ${id} not found` });
    }

    public deleteCasa = async(req: Request, res: Response) => {

        const id = parseInt(req.params.id!, 10);
        if (isNaN(id)) return res.status(400).json({ message: `Invalid ID` });

        const deletedCasa = await new CasaService().deleteCasa(id);

        (deletedCasa)
            ? res.status(204).send()
            : res.status(404).json({ message: `Casa with id ${id} not found` });
    }

    public getCasasByBarrio = async(req: Request, res: Response) => {

        // console.log('req.params:', req.params);

        // const barrio = req.query.barrio as string;

        // if (!barrio) {
        //     return res.status(400).json({ message: 'Barrio query parameter is required' });
        // }

        // const filteredCasas = this.casas.filter(c => c.barrio.toLowerCase() === barrio.toLowerCase());

        // if (filteredCasas.length > 0) {
        //     res.json(filteredCasas);
        // } else {
        //     res.status(404).json({ message: 'No casas found in the specified barrio' });
        // }
    }

    public getCasasByValor = async(req: Request, res: Response) => {

        // const valor = req.query.valor as string;

        // if (!valor) {
        //     return res.status(400).json({ message: 'Valor query parameter is required' });
        // }

        // const filteredCasas = this.casas.filter(c => c.valor === valor);

        // if (filteredCasas.length > 0) {
        //     res.json(filteredCasas);
        // } else {
        //     res.status(404).json({ message: 'No casas found with the specified valor' });
        // }
    }

    public getCasasByBarrioAndValor = async(req: Request, res: Response) => {

        // const barrio = req.query.barrio as string;
        // const valor = req.query.valor as string;

        // if (!barrio || !valor) {
        //     return res.status(400).json({ message: 'Both barrio and valor query parameters are required' });
        // }

        // const filteredCasas = this.casas.filter(c => 
        //     c.barrio.toLowerCase() === barrio.toLowerCase() && c.valor === valor
        // );

        // if (filteredCasas.length > 0) {
        //     res.json(filteredCasas);
        // } else {
        //     res.status(404).json({ message: 'No casas found with the specified barrio and valor' });
        // }
    }


}