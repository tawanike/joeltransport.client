import { createContext, Dispatch } from "react";
import {
    ADD_BAKKIE_SHUTTLE,
    ADD_MOVE_DETAILS,
    ADD_STORAGE_COUNT,
    ADD_STORAGE_HANDLING_FEE,
    ADJUST_ADDITIONAL_SERVICES,
    CostSummary,
    IAction,
    RESET_COST_SUMMARY,
    SELECT_TRUCK,
    ZERO_TRUCK_QUANTITY,
} from "../_models/types";
const initialCostSummaryState: CostSummary = {} as CostSummary;

const CostSummaryReducer = (state: CostSummary, action: IAction) => {
    console.log(action);

    switch (action.type) {
        case ADJUST_ADDITIONAL_SERVICES:
            return { ...state, ...action.payload };
        case SELECT_TRUCK:
            return { ...state, ...action.payload };
        case ADD_BAKKIE_SHUTTLE:
            return { ...state, ...action.payload };
        case ADD_STORAGE_HANDLING_FEE:
            return { ...state, ...action.payload };
        case ADD_MOVE_DETAILS:
            return { ...state, ...action.payload };
        case ZERO_TRUCK_QUANTITY:
            return { ...state, truck: null };
        case RESET_COST_SUMMARY:
            return { ...initialCostSummaryState };
        case ADD_STORAGE_COUNT:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const CostSummaryStateContext = createContext({
    CostSummaryState: initialCostSummaryState,
    dispatchCostSummary: {} as Dispatch<IAction>,
});

const CostSummaryStateProvider = CostSummaryStateContext.Provider;
export default CostSummaryStateContext;
export {
    CostSummaryReducer,
    CostSummaryStateProvider,
    initialCostSummaryState,
};
