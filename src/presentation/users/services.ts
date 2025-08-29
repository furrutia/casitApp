import { User } from "./interface";
import { UserRepository } from "./repository";
import crypto from "crypto";

export class UserService {
    private repo = new UserRepository();

    private hashPassword(password: string): string {
        return crypto.createHash("sha256").update(password).digest("hex");
    }

    public async list(): Promise<User[]> {
        return this.repo.getUsers();
    }

    public async create(user: Omit<User, "id" | "password"> & { password: string }): Promise<User> {
        const hashed = this.hashPassword(user.password);

        const existingUser = await this.repo.getUserByEmail(user.email);
        if (existingUser) throw new Error("Email already in use");

        return this.repo.createUser({ ...user, password: hashed });
    }

    public async update(id: string, update: Partial<User>): Promise<User | undefined> {
        if (update.password) {
            update.password = this.hashPassword(update.password);
        }
        return this.repo.updateUser(id, update);
    }

    public async delete(id: string): Promise<boolean> {
        return this.repo.deleteUser(id);
    }

    public async login({ username, password }: { username?: string; password: string }) {
        //const hashed = this.hashPassword(password);
        let user: User | undefined;
        if (username) user = await this.repo.getUserByUsername(username);

        if (!user) return { success: false, message: "Usuario no encontrado", statusCode: 404 };
        if (user.password !== password) return { success: false, message: "Contraseña incorrecta", statusCode: 401 };
        if (user.isBlocked) return { success: false, message: "Usuario bloqueado", statusCode: 403 };
        if (new Date(user.expiredAt) < new Date()) return { success: false, message: "La contraseña expiró, debe cambiarla", statusCode: 423 };
        return { success: true, user, statusCode: 200 };
    }
}