import React, { Dispatch, createContext, useContext, useEffect, useReducer } from "react";
import { getBooking } from "src/_actions/booking.actions";
import { useAPI } from "src/_hooks";
import {
    ADD_FORM_VALUES,
    ADD_PRODUCTS_DATA,
    EDIT_ADDITIONAL_SERVICES,
    GET_BOOKING,
    IAction,
    IBooking,
    IFormValues
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
        specialized_moving_services: false
    },
} as IBooking;
type ContextProviderProps = {
    children: React.ReactNode;
};

const reducer = (state: IBooking, action: IAction) => {
    console.log(action);
    switch (action.type) {
        case GET_BOOKING:
            return { ...state, selected: action.payload };
        case ADD_PRODUCTS_DATA:
            return { ...state, products: action.payload };
        case ADD_FORM_VALUES:

            return { ...state, formValues: { ...state.formValues, ...action.payload } };
        case EDIT_ADDITIONAL_SERVICES:
            return { ...state, additionalServices: { ...state.additionalServices, ...action.payload } };
        default:
            return state;
    }
}

export const BookingContext = createContext({} as InitContextProps);

const BookingContextProvider: React.FC<ContextProviderProps> = (props) => {
    const api = useAPI();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { CostSummaryState, dispatchCostSummary } = useContext(CostSummaryStateContext);

    useEffect(() => {
        const bookingId = localStorage.getItem('bookingId');
        if (bookingId) {
            api.get(`/bookings/${bookingId}`, false)
            .then((res: any) => {
                dispatch(getBooking(res));
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
