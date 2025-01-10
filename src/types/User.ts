export type User = {
    id: number,
    phone: string,
    username: string,
    role: Roles,
    avatarUrl: string | null,
}

export type Register = {
    phone: string,
    username: string,
    password: string,
}

export type Login = {
    username: string,
    password: string,
}

export enum Roles {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MODERATOR = 'MODERATOR',
    SUPERADMIN = 'SUPERADMIN',
}