import { CostSummary } from "src/_models/types";

import accounting from "accounting";
accounting.settings = {
  currency: {
    symbol: "R", // default currency symbol is '$'
    format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
    decimal: ".", // decimal point separator
    thousand: ",", // thousands separator
    precision: 2, // decimal places
  },
  number: {
    precision: 0, // default precision on numbers is 0
    thousand: ",",
    decimal: ".",
  },
};

const getSubTotalStorage = (state: any): number => {
  if (state && state.storage) {
    return (state.storage?.quantity || 0) * (state.storage?.price || 0);
  }
  return 0.0;
};

const getSubTotal = (state: any): string => {
  return (Object.keys(state) as Array<keyof CostSummary>)
    .map((expense) => {
      if (state && state[expense]) {
        if (state[expense].additional_costs) {
          return (state[expense]?.quantity || 0) * (state[expense]?.price || 0);
        } else {
          return (state[expense]?.quantity || 0) * (state[expense]?.price || 0);
        }
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

const truckTotal = (truck: any): string => {
  let truckTotal = "0.00";
  if (truck) {
    if (truck.additional_costs.distance == 0) {
      truckTotal =
        truck.price +
        truck.additional_costs.crew +
        truck.additional_costs.distance +
        truck.additional_costs.peak_period +
        truck.additional_costs.saturday +
        truck.additional_costs.holiday +
        truck.additional_costs.sunday +
        truck.additional_costs.working_lift_origin +
        truck.additional_costs.working_lift_destination;
    } else {
      truckTotal = truck.price;
    }

    return truckTotal;
  }

  return accounting.formatMoney(0);
};

const getVAT = (state: any): number => {
  const subTotal = getSubTotal(state);
  const vat = Number(subTotal) * 0.15;
  return vat;
};

const getTotal = (state: any): number => {
  const subTotal = getSubTotal(state);
  const total = Number(subTotal) * 1.15;
  return total;
};

export const Calculations = {
  getVAT,
  getTotal,
  truckTotal,
  getSubTotal,
  getTotalInCents,
  getSubTotalStorage,
};
