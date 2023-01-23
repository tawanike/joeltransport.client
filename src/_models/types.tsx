//Authorization
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export enum UserRoles {
    Global = "global",
    Manager = "manager",
    Trafficker = "trafficker"
}

export type User = {
    username?: string;
    user_id: string;
    token: string;
    role?: UserRoles
} | null;

export type RequestOptions = {
    method: string
    headers: {
        'Content-Type'?: string
        Authorization: string
    }
    body: any,
    mode?: "cors" | "no-cors" | "same-origin"
}

export type RequestDetails = {
    method: string
    token?: string
}

export type FetchWrapper = {
    get: (url: string, body?: any) => Promise<any>;
    post: (url: string, body: any) => Promise<any>;
    put: (url: string, body: any) => Promise<any>;
    delete: (url: string, body: any) => Promise<any>;
}

export type LoginDetails = { username: string, password: string };

export interface IAction { type: string, payload?: any }
