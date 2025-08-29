import { Request, Response } from "express";
import { UserService } from "./services";

export class UserController {
    private service = new UserService();

    public list = async (_: Request, res: Response) => {
        const users = await this.service.list();
        res.json(users);
    };

    public create = async (req: Request, res: Response) => {
        try {
            const user = await this.service.create(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            const status = error?.cause?.statusCode || 500;
            res.status(status).json({ message: error.message });
        }
    };

    public update = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Falta el parámetro id" });
        const updated = await this.service.update(id, req.body);
        if (!updated) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(updated);
    };

    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Falta el parámetro id" });
        const deleted = await this.service.delete(id);
        if (!deleted) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: "Usuario eliminado" });
    };

    public login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const { success, user, message, statusCode } = await this.service.login({ username, password });
        if (!success) return res.status(statusCode).json({ success, message, statusCode });
        res.json(user);
    };
}