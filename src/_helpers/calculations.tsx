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

const getSubTotalStorage = (products: any) => {
  if (products) {
    const bookingTotal = products
      .filter(
        (product: any) =>
          product.title === "Storage" ||
          product.title === "Storage handling fee"
      )
      .reduce(
        (previous: any, current: any) =>
          Number(previous) + Number(current.total),
        0
      );
    return bookingTotal;
  }
};

const getSubTotal = (products: any, CostSummaryState: any): number => {
  let subTotal = 0;

  subTotal = subTotal + truckTotal(products);
  if (CostSummaryState.bakkieShuttle) {
    subTotal = subTotal + CostSummaryState.bakkieShuttle?.price;
  }
  subTotal = subTotal + getSubTotalStorage(products);
  return subTotal;
};

const getTotalInCents = (products: any, state: any): number => {
  const subTotal = getSubTotal(products, state);
  const total = Number(subTotal) * 1.15;
  return Math.round(total * 100);
};

function isArray(myArray: any[]) {
  return myArray.constructor === Array;
}

const truckTotal = (products: any): number => {
  let bookingProductsTotal = 0.0;

  if (products !== undefined) {
    if (isArray(products)) {
      const bookingTotal = products
        .filter(
          (product: any) =>
            product.title !== "Storage" &&
            product.title !== "Storage handling fee" &&
            product.title !== "Bakkie Shuttle Both Addresses" &&
            product.title !== "Bakkie Shuttle"
        )
        .reduce((previous: any, current: any) => {
          return Number(previous) + Number(current.total);
        }, 0);

      bookingProductsTotal = bookingTotal;
    }
  }
  return bookingProductsTotal;
};

const getVAT = (products: any, CostSummaryState: any): number => {
  const subTotal = getSubTotal(products, CostSummaryState);
  const vat = Number(subTotal) * 0.15;
  return vat;
};

const getTotal = (products: any, CostSummaryState: any): number => {
  console.log("products", products);
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
