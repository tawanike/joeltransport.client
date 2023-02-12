//Authorization
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_BOOKING = "GET_BOOKING";
export const SELECT_TRUCK = "SELECT_TRUCK";
export const ADD_BAKKIE_SHUTTLE = "ADD_BAKKIE_SHUTTLE";
export const ADJUST_ADDITIONAL_SERVICES = "ADJUST_ADDITIONAL_SERVICES";

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

export type CostSummary = {
    bubbleWrap: {
        quantity: number,
        price: number
    } | null;
    largeBox: {
        quantity: number,
        price: number
    } | null;
    mediumBox: {
        quantity: number,
        price: number
    } | null;
    truck: {
        quantity: number,
        price: number,
        offPeakDiscount: number
    } | null;
    bakkieShuttle: {
        quantity: number,
        price: number
    } | null;
}

export type FetchWrapper = {
    get: (url: string, body?: any) => Promise<any>;
    post: (url: string, body: any) => Promise<any>;
    put: (url: string, body: any) => Promise<any>;
    delete: (url: string, body: any) => Promise<any>;
}

export type LoginDetails = { username: string, password: string };

export interface IAction { type: string, payload?: any }

export interface IProduct {
    id: string,
    title: string,
    slug: string,
    subtitle: string,
    description: string,
    image: string | null,
    category: number,
    ordering: number,
    published: boolean,
    size: string,
    unit: string,
    price: number;
    weight: number | null;
    load_capacity: number | null;
    off_peak_discount: number;
}


export interface IBooking {
    id: string,

}
