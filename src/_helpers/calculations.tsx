import { CostSummary } from "src/_models/types";

const getSubTotal = (state: CostSummary) => {
    return (Object.keys(state) as Array<keyof CostSummary>)
        .map((expense) => {
            if (state && state[expense]) {
                return (state[expense]?.quantity || 0) * (state[expense]?.price || 0);
            }
            return 0
        })
        .reduce((sum, exp) => sum + exp, 0);
}

export const Calculations = {
    getSubTotal
}
