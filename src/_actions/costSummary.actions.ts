import { ADD_STORAGE_COUNT, ADD_STORAGE_HANDLING_FEE } from "src/_models/types";


export const addStorageCount = (payload: any) => {
    return {
        type: ADD_STORAGE_COUNT,
        payload: {
            storage: payload
        },
    };
}

export const addHandlingFee = (payload: any) => {
    return {
        type: ADD_STORAGE_HANDLING_FEE,
        payload: {
            storageHandlingFee: payload
        },
    };
}
