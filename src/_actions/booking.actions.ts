import { GET_BOOKING, IBooking } from 'src/_models/types';

export const getBooking = (booking: IBooking) => {
    return {
        type: GET_BOOKING,
        payload: booking
    }
}
