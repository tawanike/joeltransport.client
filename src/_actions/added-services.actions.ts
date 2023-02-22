import { ADD_BAKKIE_SHUTTLE } from '../_models/types';

export const addBakkieShuttle = (bakkieShuttle: any) => {
    return {
        type: ADD_BAKKIE_SHUTTLE,
        payload: {
            bakkieShuttle: bakkieShuttle

        }
    }
}
