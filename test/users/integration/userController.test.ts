import request from "supertest";
import { Server } from "../../../src/presentation/server";
import { AppRoutes } from "../../../src/presentation/routes";

const USER_PATH = '/api/users';

// Inicializa el servidor y la app antes de los tests
let app: any;

beforeAll(async () => {
    const server = new Server({ port: 3000, routes: AppRoutes.routes, public_path: "public" });
    await server.initialConfig();
    app = server.getApp();
});

describe("UserController - Integración", () => {
    let userId: string;

    test("GET /api/users debe devolver un array de usuarios", async () => {
        const res = await request(app).get(USER_PATH);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /api/users debe crear un usuario", async () => {
        const userData = {
            username: "testuser",
            email: "testuser@email.com",
            password: "123456",
            isAdmin: false,
            isBlocked: false,
            expiredAt: new Date(Date.now() + 10000000).toISOString(),
            profileImage: "images/user2.webp"
        };
        const res = await request(app).post(USER_PATH).send(userData);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
        userId = res.body.id;
    });

    test("PUT /api/users/:id debe actualizar un usuario", async () => {
        const res = await request(app).put(`${USER_PATH}/${userId}`).send({ username: "updatedUser" });
        expect(res.status).toBe(200);
        expect(res.body.username).toBe("updatedUser");
    });

    test("DELETE /api/users/:id debe eliminar un usuario", async () => {
        const res = await request(app).delete(`${USER_PATH}/${userId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Usuario eliminado");
    });

    test("POST /api/users/login debe fallar si el usuario no existe", async () => {
        const res = await request(app).post(`${USER_PATH}/login`).send({ username: "noexiste", password: "123456" });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Usuario no encontrado");
    });
});