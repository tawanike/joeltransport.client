import { ADD_STORAGE_COUNT } from "src/_models/types";


export const addStorageCount = (payload: any) => {
    return {
        type: ADD_STORAGE_COUNT,
        payload: {
            storage: payload
        },
    };
}
