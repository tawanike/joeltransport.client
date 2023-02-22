import { GET_BOOKING } from 'src/_models/types';

export const getBooking = (booking: any) => {
    return {
        type: GET_BOOKING,
        payload: booking
    }
}
