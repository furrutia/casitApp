import { Request, Response } from "express";
import { UserService } from "./services";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestión de usuarios
 */
export class UserController {
    private service = new UserService();


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
    public list = async (_: Request, res: Response) => {
        const users = await this.service.list();
        res.json(users);
    };

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       409:
 *         description: Email ya existe
 */
    public create = async (req: Request, res: Response) => {
        try {
            const user = await this.service.create(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            const status = error?.cause?.statusCode || 500;
            res.status(status).json({ message: error.message });
        }
    };

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */    
    public update = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Falta el parámetro id" });
        const updated = await this.service.update(id, req.body);
        if (!updated) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(updated);
    };


/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Falta el parámetro id" });
        const deleted = await this.service.delete(id);
        if (!deleted) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: "Usuario eliminado" });
    };

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Contraseña incorrecta
 *       403:
 *         description: Usuario bloqueado
 *       404:
 *         description: Usuario no encontrado
 *       423:
 *         description: Contraseña expirada
 */
    public login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const { success, user, message, statusCode } = await this.service.login({ username, password });
        if (!success) return res.status(statusCode).json({ success, message, statusCode });
        res.json(user);
    };
}