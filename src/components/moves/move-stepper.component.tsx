import { useContext, useState } from "react";
import { BsInfoCircle, BsTruck, BsCartPlus, BsPerson } from "react-icons/bs";
import { RxCaretDown } from "react-icons/rx";
import { BookingContext } from "src/_contexts/booking.context";
import AddedServices from "./addedService.component";
import ChooseTruck from "./chooseTruck.component";
import MoveDetails from "./moveDetails.component";
import PersonalInformation from "./personalInfomation.componnent";

const MoveStepper = () => {
    const [isHoliday, setIsHoliday] = useState(false);
    const { state: bookingState, dispatch: bookingDispatch } = useContext(BookingContext);
    const [currentView, setCurrentView] = useState("")
    const toggleView = (view: string) => {
        if (currentView === view) {
            setCurrentView("");
            return;
        }
        setCurrentView(view);
    }
    return <>
        <div className="col-12 moves__stepper">
            <div className="moves__step col-12 mb-3">
                <div className="row">
                    <div className="col-12 moves__step__head" onClick={() => toggleView("move")}>
                        <div className="row">
                            <div className="col-11">
                                <p><BsInfoCircle className="me-2" /> Move details</p>
                            </div>

                            <div className="col-1 moves__step__head__curret">
                                <RxCaretDown />
                            </div>
                        </div>
                    </div>
                    {currentView === "move" && <MoveDetails />}
                </div>
            </div>
            <div className="moves__step col-12 mb-3">
                <div className="row">
                    <div className="col-12 moves__step__head" onClick={() => toggleView("truck")}>
                        <div className="row">
                            <div className="col-11">
                                <p><BsTruck className="me-2" /> Choose a truck</p>
                            </div>

                            <div className="col-1 moves__step__head__curret">
                                <RxCaretDown />
                            </div>
                        </div>
                    </div>
                    {currentView === "truck" && <ChooseTruck
                        isHoliday={isHoliday}
                    />}
                </div>
            </div>

            <div className="moves__step col-12 mb-3">
                <div className="row">
                    <div className="col-12 moves__step__head" onClick={() => toggleView("added")}>
                        <div className="row">
                            <div className="col-11">
                                <p><BsCartPlus className="me-2" />Added services</p>
                            </div>

                            <div className="col-1 moves__step__head__curret">
                                <RxCaretDown />
                            </div>
                        </div>
                    </div>
                    {currentView === "added" && <AddedServices />}
                </div>
            </div>

            <div className="moves__step col-12 mb-3">
                <div className="row">
                    <div className="col-12 moves__step__head" onClick={() => toggleView("personal")}>
                        <div className="row">
                            <div className="col-11">
                                <p><BsPerson className="me-2" />Personal information</p>
                            </div>

                            <div className="col-1 moves__step__head__curret">
                                <RxCaretDown />
                            </div>
                        </div>
                    </div>
                    {currentView === "personal" && <PersonalInformation />}
                </div>
            </div>

        </div>
    </>
}

export default MoveStepper;
