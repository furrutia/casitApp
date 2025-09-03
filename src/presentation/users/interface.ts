/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         isAdmin:
 *           type: boolean
 *         isBlocked:
 *           type: boolean
 *         expiredAt:
 *           type: string
 *           format: date-time
 *         profileImage:
 *           type: string
 */
export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isBlocked: boolean;
    expiredAt: Date;
    profileImage: string;
}