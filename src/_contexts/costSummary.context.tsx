import { createContext, Dispatch } from "react";
import { ADD_BAKKIE_SHUTTLE, ADD_MOVE_DETAILS, ADJUST_ADDITIONAL_SERVICES, CostSummary, IAction, SELECT_TRUCK } from "../_models/types";
const initialCostSummaryState: CostSummary = {} as CostSummary;

const CostSummaryReducer = (state: CostSummary, action: IAction) => {
    switch (action.type) {
        case ADJUST_ADDITIONAL_SERVICES:
            return { ...state, ...action.payload };
        case SELECT_TRUCK:
            return { ...state, ...action.payload }
        case ADD_BAKKIE_SHUTTLE:
            return { ...state, ...action.payload };
        case ADD_MOVE_DETAILS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export const CostSummaryStateContext = createContext({
    CostSummaryState: initialCostSummaryState,
    dispatchCostSummary: {} as Dispatch<IAction>,
});

const CostSummaryStateProvider = CostSummaryStateContext.Provider;
export default CostSummaryStateContext;
export { CostSummaryStateProvider, CostSummaryReducer, initialCostSummaryState };
