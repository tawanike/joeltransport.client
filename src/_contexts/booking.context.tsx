import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { addBakkieShuttle } from "src/_actions/added-services.actions";
import { getBooking } from "src/_actions/booking.actions";
import { selectTruck } from "src/_actions/trucks.actions";
import { isHoliday } from "src/_helpers/dateFormat";
import { useAPI } from "src/_hooks";
import {
  ADD_FORM_VALUES,
  ADD_PRODUCTS_DATA,
  EDIT_ADDITIONAL_SERVICES,
  GET_BOOKING,
  IAction,
  IBooking,
  IFormValues,
} from "src/_models/types";
import CostSummaryStateContext from "./costSummary.context";

export interface InitContextProps {
  state: IBooking;
  dispatch: Dispatch<IAction>;
}

const initialState = {
  id: undefined,
  products: [],
  formValues: {} as IFormValues,
  additionalServices: {
    packing_service: false,
    packaging_material: false,
    insurance: false,
    specialized_moving_services: false,
  },
} as IBooking;
type ContextProviderProps = {
  children: React.ReactNode;
};

const reducer = (state: IBooking, action: IAction) => {
  console.log(action);
  switch (action.type) {
    case GET_BOOKING:
      return {
        ...state,
        formValues: { ...state.formValues, ...action.payload },
      };
    case ADD_PRODUCTS_DATA:
      return { ...state, products: action.payload };
    case ADD_FORM_VALUES:
      return {
        ...state,
        formValues: { ...state.formValues, ...action.payload },
      };
    case EDIT_ADDITIONAL_SERVICES:
      return {
        ...state,
        additionalServices: { ...state.additionalServices, ...action.payload },
      };
    default:
      return state;
  }
};

export const BookingContext = createContext({} as InitContextProps);

const BookingContextProvider: React.FC<ContextProviderProps> = (props) => {
  const api = useAPI();
  const [state, dispatch] = useReducer(reducer, initialState);
  const costSummaryContext = useContext(CostSummaryStateContext);

  useEffect(() => {
    const bookingId = localStorage.getItem("bookingId");
    if (bookingId) {
      api.get(`/bookings/${bookingId}`, false).then((res: any) => {
        if (res.move_date === null) {
          delete res.move_date;
          dispatch(getBooking(res));
        } else {
          dispatch(getBooking(res));
        }

        if (res.products.length > 0) {
          const truck = res.products.find(
            (product: any) => product.category === "trucks"
          );
          const bakkieShuttle = res.products.find(
            (product: any) => product.slug === "bakkie-shuttle"
          );

          if (bakkieShuttle) {
            costSummaryContext.dispatchCostSummary(
              addBakkieShuttle({
                quantity: 1,
                price: bakkieShuttle.price,
                requires_bakkie_shuttle: Number(1),
              })
            );

            dispatch({
              type: ADD_FORM_VALUES,
              payload: {
                requires_bakkie_shuttle: 1,
                bakkie_address: Number(bakkieShuttle.address),
              },
            });
          }
          console.log("STATE", state);
          if (
            res.products.find((product: any) => product.category === "trucks")
          ) {
            if (isHoliday(res.move_date)) {
              const price = truck.price + truck.off_peak_discount;
              const offPeakDiscount = 0;

              costSummaryContext.dispatchCostSummary(
                selectTruck({
                  quantity: 1,
                  price: price,
                  off_peak_discount: offPeakDiscount,
                })
              );
            } else {
              const price = truck.price;
              const offPeakDiscount = truck.off_peak_discount;

              costSummaryContext.dispatchCostSummary(
                selectTruck({
                  quantity: 1,
                  price: price,
                  off_peak_discount: offPeakDiscount,
                })
              );
            }
          }
        }
      });
    }
  }, []);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingContextProvider;
