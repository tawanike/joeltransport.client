import React, { Dispatch, createContext, useReducer } from "react";
import { ADD_FORM_VALUES, ADD_PRODUCTS_DATA, GET_BOOKING, IAction, IBooking } from "src/_models/types";

export interface InitContextProps {
    state: IBooking;
    dispatch: Dispatch<IAction>;
}

const initialState = {
    formValues: {},
} as IBooking;
type ContextProviderProps = {
    children: React.ReactNode;
};

const reducer = (state: IBooking, action: IAction) => {
    switch (action.type) {
        case GET_BOOKING:
            return { ...state, selected: action.payload };
        case ADD_PRODUCTS_DATA:
            return { ...state, products: action.payload };
        case ADD_FORM_VALUES:
            return { ...state, formValues: { ...state.formValues, ...action.payload } };
        default:
            return state;
    }
}

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
