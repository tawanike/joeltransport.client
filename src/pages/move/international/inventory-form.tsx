import AddedServices from "components/moves/addedService.component";
import InventoryForm from "components/moves/inventoryForm.component";
import MoveDetails from "components/moves/moveDetails.component";
import PersonalInformation from "components/moves/personalInfomation.componnent";
import { CoverImage } from "components/ui";
import { useState } from "react";
import { BsCartPlus, BsInfoCircle, BsPerson, BsTruck } from "react-icons/bs";
import { RxCaretDown } from "react-icons/rx";

const InternationalMoveServices = () => {
  const [currentView, setCurrentView] = useState("");

  const toggleView = (view: string) => {
    if (currentView === view) {
      setCurrentView("");
      return;
    }
    setCurrentView(view);
  };
  return (
    <div className="moves container-fluid">
      <CoverImage
        size="medium"
        src="/img/kaleb.png"
        pageTitle="Move Services"
        description="Meet the experts in moving and storage"
      />

      <div className="moves__container container mt-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h2>Make an international move</h2>
            <p>
              To provide you with the best quote, we need some information about
              you Once you are happy with your quote, you will need to log in or
              create an account to pay
            </p>
          </div>
          <div className="col-6">
            <div className="col-12 moves__stepper">
              <div className="moves__step col-12 mb-3">
                <div className="row">
                  <div
                    className="col-12 moves__step__head"
                    onClick={() => toggleView("move")}
                  >
                    <div className="row">
                      <div className="col-11">
                        <p>
                          <BsInfoCircle className="me-2" /> Move details
                        </p>
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
                  <div
                    className="col-12 moves__step__head"
                    onClick={() => toggleView("truck")}
                  >
                    <div className="row">
                      <div className="col-11">
                        <p>
                          <BsTruck className="me-2" />
                          Inventory Form
                        </p>
                      </div>

                      <div className="col-1 moves__step__head__curret">
                        <RxCaretDown />
                      </div>
                    </div>
                  </div>
                  {currentView === "truck" && <InventoryForm />}
                </div>
              </div>

              <div className="moves__step col-12 mb-3">
                <div className="row">
                  <div
                    className="col-12 moves__step__head"
                    onClick={() => toggleView("added")}
                  >
                    <div className="row">
                      <div className="col-11">
                        <p>
                          <BsCartPlus className="me-2" />
                          Added services
                        </p>
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
                  <div
                    className="col-12 moves__step__head"
                    onClick={() => toggleView("personal")}
                  >
                    <div className="row">
                      <div className="col-11">
                        <p>
                          <BsPerson className="me-2" />
                          Personal information
                        </p>
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
          </div>
          <div className="col-5 offset-1"></div>
        </div>
      </div>
    </div>
  );
};

export default InternationalMoveServices;
