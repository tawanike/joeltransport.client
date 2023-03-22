import { useContext } from "react";
import { RxCaretDown } from "react-icons/rx";
import { BookingContext } from "src/_contexts/booking.context";
import { CHANGE_OPEN_SECTION } from "src/_models/types";
import AddedServices from "./bakkieShuttle.component";
import BookStorageUnit from "./bookStorageUnit.component";
import MoveDetails from "./moveDetails.component";
import PersonalInformation from "./personalInfomation.componnent";

const StorageStepper = () => {
    const bookingContext = useContext(BookingContext);
    const { state: bookingState } = useContext(BookingContext);

    return (
        <>
            <div className="col-12 moves__stepper">
                <div className="moves__step col-12 mb-3">
                    <div className="row">
                        <div
                            className="col-12 moves__step__head"
                            onClick={() => bookingContext.dispatch({ type: CHANGE_OPEN_SECTION, payload: { openSection: "move_details" } })}
                        >
                            <div className="row">
                                <div className="col-11">
                                    <p>
                                        Delivery arrangements
                                    </p>
                                </div>

                                <div className="col-1 moves__step__head__curret">
                                    <RxCaretDown />
                                </div>
                            </div>
                        </div>
                        {bookingContext.state.openSection === "move_details" && (
                            <MoveDetails
                                hasDelivery={false}
                                dateLabel="When would you like us to collect?"
                            />
                        )}
                    </div>
                </div>
                <div className="moves__step col-12 mb-3">
                    <div className="row">
                        <div
                            className="col-12 moves__step__head"
                            onClick={() => bookingContext.dispatch({ type: CHANGE_OPEN_SECTION, payload: { openSection: "storage" } })}
                        >
                            <div className="row">
                                <div className="col-11">
                                    <p>
                                        Book storage unit
                                    </p>
                                </div>

                                <div className="col-1 moves__step__head__curret">
                                    <RxCaretDown />
                                </div>
                            </div>
                        </div>
                        {bookingContext.state.openSection === "storage" && <BookStorageUnit />}
                    </div>
                </div>
                {bookingState.formValues.collection && (
                    <div className="moves__step col-12 mb-3">
                        <div className="row">
                            <div
                                className="col-12 moves__step__head"
                                onClick={() => bookingContext.dispatch({ type: CHANGE_OPEN_SECTION, payload: { openSection: "additional_services" } })}
                            >
                                <div className="row">
                                    <div className="col-11">
                                        <p>
                                            Bakkie shuttle
                                        </p>
                                    </div>

                                    <div className="col-1 moves__step__head__curret">
                                        <RxCaretDown />
                                    </div>
                                </div>
                            </div>
                            {bookingContext.state.openSection === "additional_services" && <AddedServices />}
                        </div>
                    </div>
                )}
                <div className="moves__step col-12 mb-3">
                    <div className="row">
                        <div
                            className="col-12 moves__step__head"
                            onClick={() => bookingContext.dispatch({ type: CHANGE_OPEN_SECTION, payload: { openSection: "personal" } })}
                        >
                            <div className="row">
                                <div className="col-11">
                                    <p>

                                        Personal information
                                    </p>
                                </div>

                                <div className="col-1 moves__step__head__curret">
                                    <RxCaretDown />
                                </div>
                            </div>
                        </div>
                        {bookingContext.state.openSection === "personal" && <PersonalInformation />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default StorageStepper;
