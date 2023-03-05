import { ADD_FORM_VALUES, GET_BOOKING } from 'src/_models/types';

export const getBooking = (booking: any) => {
    return {
        type: GET_BOOKING,
        payload: booking
    }
}


export const updateBooking = (payload: any) => {
    return {
        type: ADD_FORM_VALUES,
        payload: payload
    }
}
