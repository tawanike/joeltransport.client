import { CostSummary } from "src/_models/types";

const getSubTotal = (state: any): number => {
  return (Object.keys(state) as Array<keyof CostSummary>)
    .map((expense) => {
      if (state && state[expense]) {
        return (state[expense]?.quantity || 0) * (state[expense]?.price || 0);
      }
      return 0;
    })
    .reduce((sum, exp) => sum + exp, 0);
};

const getTotalInCents = (state: any): number => {
  const subTotal = getSubTotal(state);
  const total = Number(subTotal) * 1.15;
  return Math.round(total * 100);
};

export const Calculations = {
  getSubTotal,
  getTotalInCents,
};
