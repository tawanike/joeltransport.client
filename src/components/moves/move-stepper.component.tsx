import { useContext, useEffect, useRef } from "react";
import { RxCaretDown } from "react-icons/rx";
import { BookingContext } from "src/_contexts/booking.context";
import { CHANGE_OPEN_SECTION } from "src/_models/types";
import BakkieShuttle from "./bakkieShuttle.component";
import ChooseTruck from "./chooseTruck.component";
import MoveDetails from "./moveDetails.component";
import PersonalInformation from "./personalInfomation.componnent";

const MoveStepper = () => {
  const bookingContext = useContext(BookingContext);
  const moveDetailsRef = useRef<any>(null);
  const chooseTruckRef = useRef<any>(null);
  const bukkieShuttleRef = useRef<any>(null);
  const personalInfoRef = useRef<any>(null);
  const additionalServicesRef = useRef<any>(null);
  const inventoryFormRef = useRef<any>(null);
  const storageUnitRef = useRef<any>(null);

  useEffect(() => {
    switch (bookingContext.state.openSection) {
      case "move_details":
        return moveDetailsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      case "additional_services":
        return additionalServicesRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      case "bakkie_shuttle":
        return bukkieShuttleRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      case "inventory":
        return inventoryFormRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      case "personal":
        return personalInfoRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      case "truck":
        return chooseTruckRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      case "storage":
        return storageUnitRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      default:
        return moveDetailsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }
  }, [bookingContext.state.openSection]);
  return (
    <>
      <div className="col-12 moves__stepper">
        <div className="moves__step col-12 mb-3" ref={moveDetailsRef}>
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

        <div className="moves__step col-12 mb-3" ref={chooseTruckRef}>
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
                  <p>
                    Choose a truck{" "}
                    <span style={{ fontSize: 8, color: "red" }}>
                      (Required)
                    </span>
                  </p>
                </div>

                <div className="col-1 moves__step__head__curret">
                  <RxCaretDown />
                </div>
              </div>
            </div>
            {bookingContext.state.openSection === "truck" && <ChooseTruck />}
          </div>
        </div>

        <div className="moves__step col-12 mb-3" ref={bukkieShuttleRef}>
          <div className="row">
            <div
              className="col-12 moves__step__head"
              onClick={() =>
                bookingContext.dispatch({
                  type: CHANGE_OPEN_SECTION,
                  payload: { openSection: "bakkie_shuttle" },
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
            {bookingContext.state.openSection === "bakkie_shuttle" && (
              <BakkieShuttle />
            )}
          </div>
        </div>

        <div className="moves__step col-12 mb-3" ref={personalInfoRef}>
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
                  <p>
                    Personal information{" "}
                    <span style={{ fontSize: 8, color: "red" }}>
                      (Required)
                    </span>
                  </p>
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
