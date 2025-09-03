import { User } from "./interface";
import * as mockUsers from "../../data/MockUsers.json";
import { v4 as uuidv4 } from "uuid";

const users: User[] = (mockUsers as any).default ?? mockUsers;

export interface IUserRepository {
    getUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    createUser(user: Omit<User, "id">): Promise<User>;
    updateUser(id: string, update: Partial<User>): Promise<User | undefined>;
    deleteUser(id: string): Promise<boolean>;
}


export class UserRepository implements IUserRepository {
    public async getUsers(): Promise<User[]> {
        return users;
    }

    public async getUserById(id: string): Promise<User | undefined> {
        return users.find(user => user.id === id);
    }

    public async getUserByUsername(username: string): Promise<User | undefined> {
        return users.find(user => user.username === username);
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        return users.find(user => user.email === email);
    }

    public async createUser(user: Omit<User, "id">): Promise<User> {
        const newUser: User = { id: uuidv4(), ...user };
        users.push(newUser);
        return newUser;
    }

    public async updateUser(id: string, update: Partial<User>): Promise<User | undefined> {
        const idx = users.findIndex(u => u.id === id);
        if (idx === -1) return undefined;
        users[idx] = { ...users[idx]!, ...update! };
        return users[idx];
    }

    public async deleteUser(id: string): Promise<boolean> {
        const idx = users.findIndex(u => u.id === id);
        if (idx === -1) return false;
        users.splice(idx, 1);
        return true;
    }
}