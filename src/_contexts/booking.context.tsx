import React, {
  Dispatch,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import { useAPI } from "src/_hooks";
import {
  ADD_FORM_VALUES,
  ADD_INVENTORY_ITEM,
  ADD_PRODUCTS_DATA,
  CHANGE_OPEN_SECTION,
  DELETE_INVENTORY_ITEM,
  EDIT_ADDITIONAL_SERVICES,
  GET_BOOKING,
  IAction,
  IBooking,
  IFormValues,
  RESET_BOOKING,
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
  inventoryList: [],
  openSection: "move_details",
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
    case CHANGE_OPEN_SECTION:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_INVENTORY_ITEM:
      return {
        ...state,
        inventoryList: [
          ...state.inventoryList.filter(
            (x) => x.inventory_item !== action.payload.inventory_item
          ),
          action.payload,
        ],
      };
    case DELETE_INVENTORY_ITEM:
      return {
        ...state,
        inventoryList: state.inventoryList.filter(
          (x) => x.inventory_item !== action.payload
        ),
      };
    case EDIT_ADDITIONAL_SERVICES:
      return {
        ...state,
        additionalServices: { ...state.additionalServices, ...action.payload },
      };
    case RESET_BOOKING:
      return {
        ...state,
        formValues: { ...state.formValues, ...{} },
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
  const [retrievedBooking, setRetrievedBooking] = useState();

  // useEffect(() => {
  //   const bookingId = localStorage.getItem("bookingId");
  //   if (bookingId) {
  //     api
  //       .get(`/bookings/${bookingId}`, false)
  //       .then((res: any) => {
  //         setRetrievedBooking(res);
  //         if (res.move_date === null) {
  //           delete res.move_date;
  //           dispatch(getBooking(res));
  //         } else {
  //           dispatch(getBooking(res));
  //         }

  //         if (res.move_type == 1) {
  //           dispatch({
  //             type: ADD_FORM_VALUES,
  //             payload: {
  //               deliver_to_storage: Boolean(Number(res.self_delivery) as 0 | 1),
  //             },
  //           });
  //         }

  //         if (res.addons?.length > 0) {
  //           dispatch({
  //             type: "ADD_FORM_VALUES",
  //             payload: {
  //               addOns: res.addons.map((addon: any) => addon.product),
  //             },
  //           });
  //         }

  //         if (res.inventory?.length > 0) {
  //           res.inventory.forEach((item: any) => {
  //             dispatch({
  //               type: ADD_INVENTORY_ITEM,
  //               payload: item,
  //             });
  //           });
  //         }

  //         if (res.products.length > 0) {
  //           const truck = res.products.find(
  //             (product: any) => product.category === "trucks"
  //           );
  //           const bakkieShuttle = res.products.find(
  //             (product: any) => product.slug === "bakkie-shuttle"
  //           );

  //           const storage = res.products.find(
  //             (product: any) => product.slug === "storage"
  //           );

  //           if (bakkieShuttle) {
  //             costSummaryContext.dispatchCostSummary(
  //               addBakkieShuttle({
  //                 quantity: 1,
  //                 price: bakkieShuttle.price,
  //                 requires_bakkie_shuttle: Number(1),
  //               })
  //             );

  //             dispatch({
  //               type: ADD_FORM_VALUES,
  //               payload: {
  //                 requires_bakkie_shuttle: 1,
  //                 bakkie_address: Number(bakkieShuttle.address),
  //               },
  //             });
  //           }
  //           if (truck) {
  //             if (isHoliday(res.move_date)) {
  //               const price = truck.price + truck.off_peak_discount;
  //               const offPeakDiscount = 0;

  //               costSummaryContext.dispatchCostSummary(
  //                 selectTruck({
  //                   quantity: 1,
  //                   price: price,
  //                   off_peak_discount: offPeakDiscount,
  //                 })
  //               );
  //             } else {
  //               const price = truck.price;
  //               const offPeakDiscount = truck.off_peak_discount;

  //               costSummaryContext.dispatchCostSummary(
  //                 selectTruck({
  //                   quantity: 1,
  //                   price: price,
  //                   off_peak_discount: offPeakDiscount,
  //                 })
  //               );
  //             }
  //           }

  //           if (storage) {
  //             const price = storage.price;
  //             const quantity = storage.quantity;

  //             costSummaryContext.dispatchCostSummary(
  //               addStorageCount({
  //                 quantity: quantity,
  //                 price: price,
  //               })
  //             );
  //           }
  //         }

  //         return res;
  //       })
  //       .then(async (res) => {
  //         if (res.from_address && res.from_address.place_id) {
  //           const from = await geocodeByPlaceId(res.from_address.place_id);
  //           const to = await geocodeByPlaceId(res.to_address.place_id);
  //           dispatch({
  //             type: ADD_FORM_VALUES,
  //             payload: {
  //               from_address_original: from[0],
  //               to_address_original: to[0],
  //             },
  //           });
  //         }
  //       });
  //   }
  // }, []);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {props.children}
    </BookingContext.Provider>
  );
};
export default BookingContextProvider;
