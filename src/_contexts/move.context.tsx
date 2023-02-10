import { createContext, Dispatch } from "react";
import { ADJUST_ADDITIONAL_SERVICES, CostSummary, IAction } from "../_models/types";

const initialMoveState: CostSummary = {} as CostSummary;

const MoveReducer = (state: CostSummary, action: IAction) => {
    switch (action.type) {
        case ADJUST_ADDITIONAL_SERVICES:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}

export const MoveStateContext = createContext({
    MoveState: initialMoveState,
    dispatchMove: {} as Dispatch<IAction>,
});

const MoveStateProvider = MoveStateContext.Provider;
export default MoveStateContext;
export { MoveStateProvider, MoveReducer, initialMoveState };
