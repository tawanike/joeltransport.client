import { SELECT_TRUCK } from 'src/_models/types';

export const selectTruck = (truck: any) => {
    return {
        type: SELECT_TRUCK,
        payload: {
            truck: truck
        }
    }
}
