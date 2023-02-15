import { FetchWrapper } from "../_models/types";

const api = `/bookings`;

const createBooking = async (payload: any, fetchWrapper: FetchWrapper) => fetchWrapper.post(`${api}`, payload);
const updateBooking = async (payload: any, fetchWrapper: FetchWrapper) => fetchWrapper.patch(`${api}/${payload.id}`, payload);

export const bookingsService = {
    createBooking,
    updateBooking
}
