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