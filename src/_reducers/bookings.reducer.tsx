import { GET_BOOKING, IBooking } from 'src/_models/types';

export interface Action {
    type: string,
    payload: IBooking
}

export default function reducer(state: IBooking, action: Action) {
    console.log(action);
    switch (action.type) {
        case GET_BOOKING:
            return Object.assign({}, state, { selected: action.payload });

        default:
            return state;
    }
}
