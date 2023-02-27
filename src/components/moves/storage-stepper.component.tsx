import { useState } from "react";
import { BsInfoCircle, BsPerson } from "react-icons/bs";
import { RxCaretDown } from "react-icons/rx";
import AddedServices from "./addedService.component";
import PersonalInformation from "./personalInfomation.componnent";
import MoveDetails from "./moveDetails.component";
import BookStorageUnit from "./bookStorageUnit.component";

const StorageStepper = () => {
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
                    <div className="col-12 moves__step__head" onClick={() => toggleView("arrangements")}>
                        <div className="row">
                            <div className="col-11">
                                <p><BsInfoCircle className="me-2" /> Delivery arrangements</p>
                            </div>

                            <div className="col-1 moves__step__head__curret">
                                <RxCaretDown />
                            </div>
                        </div>
                    </div>
                    {currentView === "arrangements" && <MoveDetails
                        hasDelivery={false}
                        dateLabel="When would you like us to collect?"
                    />}
                </div>
            </div>
            <div className="moves__step col-12 mb-3">
                <div className="row">
                    <div className="col-12 moves__step__head" onClick={() => toggleView("unit")}>
                        <div className="row">
                            <div className="col-11">
                                <p><BsInfoCircle className="me-2" /> Book storage unit</p>
                            </div>

                            <div className="col-1 moves__step__head__curret">
                                <RxCaretDown />
                            </div>
                        </div>
                    </div>
                    {currentView === "unit" && <BookStorageUnit />}
                </div>
            </div>
            <div className="moves__step col-12 mb-3">
                <div className="row">
                    <div className="col-12 moves__step__head" onClick={() => toggleView("bakkie")}>
                        <div className="row">
                            <div className="col-11">
                                <p><BsInfoCircle className="me-2" /> Bakkie shuttle</p>
                            </div>

                            <div className="col-1 moves__step__head__curret">
                                <RxCaretDown />
                            </div>
                        </div>
                    </div>
                    {currentView === "bakkie" && <AddedServices />}
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

export default StorageStepper;
