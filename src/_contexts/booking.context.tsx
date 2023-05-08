import React, { Dispatch, createContext, useReducer } from "react";
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
  LOADING,
  RESET_BOOKING,
} from "src/_models/types";
export interface InitContextProps {
  state: IBooking;
  dispatch: Dispatch<IAction>;
}
const initialState = {
  id: undefined,
  products: [],
  loading: false,
  formValues: {
    storage_units_count: 1,
  } as IFormValues,
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
    case LOADING:
      return {
        ...state,
        ...action.payload,
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
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {props.children}
    </BookingContext.Provider>
  );
};
export default BookingContextProvider;
