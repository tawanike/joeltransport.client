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

const getSubTotal = (products: any, CostSummaryState: any): number => {
  let subTotal = 0;
  subTotal = subTotal + truckTotal(products);
  if (CostSummaryState.bakkieShuttle) {
    subTotal = subTotal + CostSummaryState.bakkieShuttle?.price;
  }

  return subTotal;
};

const getTotalInCents = (state: any): number => {
  const subTotal = getSubTotal(state);
  const total = Number(subTotal) * 1.15;
  return Math.round(total * 100);
};

const truckTotal = (products: any): number => {
  let bookingProductsTotal = 1120.0;

  if (products) {
    const bookingTotal = products.reduce((previous: any, current: any) => {
      if (current && current.category !== "bakkie-shuttle") {
        return (
          Number(previous) + Number(current.price) * Number(current.quantity)
        );
      }
    }, 0);
    return bookingTotal;
  }
  return bookingProductsTotal;
};

const getVAT = (products: any, CostSummaryState: any): number => {
  const subTotal = getSubTotal(products, CostSummaryState);
  const vat = Number(subTotal) * 0.15;
  return vat;
};

const getTotal = (products: any, CostSummaryState: any): number => {
  const subTotal = getSubTotal(products, CostSummaryState);
  const total = Number(subTotal) + getVAT(products, CostSummaryState);
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
