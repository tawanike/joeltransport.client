import { useContext } from "react";
import { RxCaretDown } from "react-icons/rx";
import { BookingContext } from "src/_contexts/booking.context";
import { CHANGE_OPEN_SECTION } from "src/_models/types";
import BakkieShuttle from "./bakkieShuttle.component";
import ChooseTruck from "./chooseTruck.component";
import MoveDetails from "./moveDetails.component";
import PersonalInformation from "./personalInfomation.componnent";

const MoveStepper = () => {
  const bookingContext = useContext(BookingContext);

  return (
    <>
      <div className="col-12 moves__stepper">
        <div className="moves__step col-12 mb-3">
          <div className="row">
            <div
              className="col-12 moves__step__head"
              onClick={() =>
                bookingContext.dispatch({
                  type: CHANGE_OPEN_SECTION,
                  payload: { openSection: "move_details" },
                })
              }
            >
              <div className="row">
                <div className="col-11">
                  <p>Move details</p>
                </div>

                <div className="col-1 moves__step__head__curret">
                  <RxCaretDown />
                </div>
              </div>
            </div>
            {bookingContext.state.openSection === "move_details" && (
              <MoveDetails
                hasDelivery={true}
                dateLabel="When would you like us to collect?"
              />
            )}
          </div>
        </div>

        <div className="moves__step col-12 mb-3">
          <div className="row">
            <div
              className="col-12 moves__step__head"
              onClick={() =>
                bookingContext.dispatch({
                  type: CHANGE_OPEN_SECTION,
                  payload: { openSection: "truck" },
                })
              }
            >
              <div className="row">
                <div className="col-11">
                  <p>Choose a truck</p>
                </div>

                <div className="col-1 moves__step__head__curret">
                  <RxCaretDown />
                </div>
              </div>
            </div>
            {bookingContext.state.openSection === "truck" && <ChooseTruck />}
          </div>
        </div>

        <div className="moves__step col-12 mb-3">
          <div className="row">
            <div
              className="col-12 moves__step__head"
              onClick={() =>
                bookingContext.dispatch({
                  type: CHANGE_OPEN_SECTION,
                  payload: { openSection: "additional_services" },
                })
              }
            >
              <div className="row">
                <div className="col-11">
                  <p>Bakkie Shuttle</p>
                </div>

                <div className="col-1 moves__step__head__curret">
                  <RxCaretDown />
                </div>
              </div>
            </div>
            {bookingContext.state.openSection === "additional_services" && (
              <BakkieShuttle />
            )}
          </div>
        </div>

        <div className="moves__step col-12 mb-3">
          <div className="row">
            <div
              className="col-12 moves__step__head"
              onClick={() =>
                bookingContext.dispatch({
                  type: CHANGE_OPEN_SECTION,
                  payload: { openSection: "personal" },
                })
              }
            >
              <div className="row">
                <div className="col-11">
                  <p>Personal information</p>
                </div>

                <div className="col-1 moves__step__head__curret">
                  <RxCaretDown />
                </div>
              </div>
            </div>
            {bookingContext.state.openSection === "personal" && (
              <PersonalInformation />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoveStepper;
