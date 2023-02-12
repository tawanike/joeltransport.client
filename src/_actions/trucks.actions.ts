import { IAction, SELECT_TRUCK } from 'src/_models/types';

export const selectTruck = (truck: any): IAction => {
    return {
        type: SELECT_TRUCK,
        payload: {
            truck: truck
        }
    }
}
