import { UserService } from "../../src/presentation/users/services";
import { User } from "../../src/presentation/users/interface";

describe("UserService", () => {

    let service: UserService;

    beforeEach(() => {
        service = new UserService();
    });

    test("list debe devolver un array de usuarios", async () => {
        const users = await service.list();
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThan(0);
    });

    test("create debe crear un usuario y devolverlo", async () => {
        const userData = {
        username: "nuevoUsuario",
        email: "nuevo@correo.com",
        password: "123456",
        isAdmin: false,
        isBlocked: false,
        expiredAt: new Date(Date.now() + 10000000),
        profileImage: "images/user2.webp"
        };
        const user = await service.create(userData);
        expect(user).toHaveProperty("id");
        expect(user.username).toBe("nuevoUsuario");
        expect(user.email).toBe("nuevo@correo.com");
    });

    test("create debe fallar si el email ya existe", async () => {
        const users = await service.list();
        const user = users[0];

        await expect(service.create({
            username: "otroUsuario",
            email: user.email,
            password: "123456",
            isAdmin: false,
            isBlocked: false,
            expiredAt: new Date(Date.now() + 10000000),
            profileImage: "images/user2.webp"
        })).rejects.toThrow("Email already in use");
    });

    test("update debe modificar un usuario existente", async () => {
        const users = await service.list();
        const user = users[0];
        const updated = await service.update(user.id, { username: "actualizado" });
        expect(updated?.username).toBe("actualizado");
    });

    test("update debe fallar si el usuario no existe", async () => {
        const updated = await service.update("nonexistentid", { username: "actualizado" });
        expect(updated).toBeUndefined();
    });

    test("delete debe eliminar un usuario existente", async () => {
        const users = await service.list();
        const user = users[0];
        const result = await service.delete(user.id);
        expect(result).toBe(true);
    });

    test("login debe fallar si el usuario no existe", async () => {
        const result = await service.login({ username: "noexiste", password: "123456" });
        expect(result.success).toBe(false);
        expect(result.statusCode).toBe(404);
    });

    test("login debe fallar si la contraseña es incorrecta", async () => {
        const users = await service.list();
        const user = users[0];
        const result = await service.login({ username: user.username, password: "wrongpassword" });
        expect(result.success).toBe(false);
        expect(result.statusCode).toBe(401);
    });

    test("login debe fallar por usuario bloqueado", async () => {
        const users = await service.list();
        const blockedUser = users.find(u => u.isBlocked);
        if (blockedUser) {
            const result = await service.login({ username: blockedUser.username, password: "123456" });
            expect(result.success).toBe(false);
            expect(result.statusCode).toBe(403);
        }
    });

    test("login debe fallar por contraseña expirada", async () => {
        const users = await service.list();
        const expiredUser = users.find(u => new Date(u.expiredAt) < new Date());
        if (expiredUser) {
            const result = await service.login({ username: expiredUser.username, password: expiredUser.password });
            expect(result.success).toBe(false);
            expect(result.statusCode).toBe(423);
        }
    });

    test("login debe tener éxito con credenciales correctas", async () => {
        const users = await service.list();
        const user = users.find(u => !u.isBlocked && new Date(u.expiredAt) > new Date());
        if (user) {
            const result = await service.login({ username: user.username, password: user.password });
            expect(result.success).toBe(true);
            expect(result.statusCode).toBe(200);
            expect(result.user?.username).toBe(user.username);
        }
    });
});