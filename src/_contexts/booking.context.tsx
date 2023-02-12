import React, { Dispatch, createContext, useReducer } from "react";
import { IBooking } from "src/_models/types";
import reducer, { Action } from "src/_reducers/bookings.reducer";

export interface InitContextProps {
  state: IBooking;
  dispatch: Dispatch<Action>;
}

const initialState = {} as IBooking;
type ContextProviderProps = {
  children: React.ReactNode;
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
