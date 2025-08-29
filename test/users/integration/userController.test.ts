import request from "supertest";
import { Server } from "../../../src/presentation/server";
import { AppRoutes } from "../../../src/presentation/routes";

const USER_PATH = '/api/users';

const server = new Server({ port: 3000, routes: AppRoutes.routes, public_path: "public" });
server.initialConfig();
const app = server.getApp();

describe("UserController - Integración", () => {
    let userId: string;

    test("GET /users debe devolver un array de usuarios", async () => {
        const res = await request(app).get(`${USER_PATH}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /users debe crear un usuario", async () => {
        const userData = {
            username: "testuser",
            email: "testuser@email.com",
            password: "123456",
            isAdmin: false,
            isBlocked: false,
            expiredAt: new Date(Date.now() + 10000000).toISOString(),
            profileImage: "images/user2.webp"
        };
        const res = await request(app).post(`${USER_PATH}`).send(userData);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
        userId = res.body.id;
    });

    test("PUT /users/:id debe actualizar un usuario", async () => {
        const res = await request(app).put(`${USER_PATH}/${userId}`).send({ username: "updatedUser" });
        expect(res.status).toBe(200);
        expect(res.body.username).toBe("updatedUser");
    });

    test("DELETE /users/:id debe eliminar un usuario", async () => {
        const res = await request(app).delete(`${USER_PATH}/${userId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Usuario eliminado");
    });

    test("POST /users/login debe fallar si el usuario no existe", async () => {
        const res = await request(app).post(`${USER_PATH}/login`).send({ username: "noexiste", password: "123456" });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Usuario no encontrado");
    });


    test("POST /users con email duplicado debe fallar", async () => {
        const user = await request(app).get(`${USER_PATH}`).then(res => res.body[0]);
        const res = await request(app).post(`${USER_PATH}`).send({
            username: "anotherUser",
            email: user.email,
            password: "123456",
            isAdmin: false,
            isBlocked: false,
            expiredAt: new Date(Date.now() + 10000000).toISOString(),
            profileImage: "images/user2.webp"
        });
        expect(res.status).toBe(409);
        expect(res.body.message).toBe("Email already in use");
    });

});