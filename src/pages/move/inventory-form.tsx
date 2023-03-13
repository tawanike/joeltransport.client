import AddedServices from "components/moves/addedServices.component";
import InventoryForm from "components/moves/inventoryForm.component";
import MoveDetails from "components/moves/moveDetails.component";
import PersonalInformation from "components/moves/personalInfomation.componnent";
import CallMeBackButton from "components/shared/callMeBackButton.component";
import { CoverImage } from "components/ui";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  BsCartPlus,
  BsCheckCircle,
  BsInfoCircle,
  BsPerson,
  BsTruck,
} from "react-icons/bs";
import { RxCaretDown } from "react-icons/rx";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
import { EDIT_ADDITIONAL_SERVICES } from "src/_models/types";

const InternationalMoveServices = () => {
  const fetchWrapper = useAPI();
  const [show, setShow] = useState(false);
  const [currentView, setCurrentView] = useState("");
  const [showSelectorModal, setShowSelectorModal] = useState(false);
  const [canConfirmMove, setCanConfirmMove] = useState(true);
  const [optionalServices, setOptionalServices] = useState<any[]>([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const { state: bookingState, dispatch: dispatchBookings } =
    useContext(BookingContext);

  const toggleView = (view: string) => {
    if (currentView === view) {
      setCurrentView("");
      return;
    }
    setCurrentView(view);
  };

  const goToCheckout = () => {
    if (canConfirmMove) {
      setShowSelectorModal(true);
    }
  };

  const selectService = async (e: any) => {
    dispatchBookings({
      type: EDIT_ADDITIONAL_SERVICES,
      payload: { [e.target.name]: e.target.checked },
    });

    const response = await fetchWrapper.post(
      `/bookings/${bookingState.formValues.id}/products/addons`,
      {
        booking: bookingState.formValues.id,
        product: e.target.value,
        category: 1,
        selected: e.target.checked,
      }
    );

    console.log("response", response);
  };

  const saveAndContinue = () => {
    setShowSelectorModal(false);
    setShow(true);
  };

  useEffect(() => {
    const getOptionalServices = async () => {
      const optionalServices = await fetchWrapper.get(
        "/products/specialized-services",
        false
      );
      setOptionalServices(optionalServices.results);
    };
    getOptionalServices();
  }, []);

  return (
    <div className="moves container-fluid">
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <div className="col-12 py-5">
            <div className="row">
              <div className="col-12 resources__modal__icon">
                <BsCheckCircle />
              </div>
              <div className="col-10 mx-5 resources__modal__head mt-4 text-center">
                <h5>
                  Your long distance quotation request submission was sent
                  successfully.
                </h5>
              </div>
              <div className="col-8 offset-2 resources__modal__text mt-4">
                <p>
                  An email confirmation has been sent to you. A move specialist
                  will call to assist you.
                </p>
              </div>
              <div className="col-12 resources__modal__button mt-4">
                <Button
                  variant="secondary"
                  className="col-4"
                  onClick={() => {
                    setShow(false);
                    window.location.href = "/";
                  }}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showSelectorModal}
        onHide={() => setShowSelectorModal(false)}
      >
        <Modal.Body>
          <div className="col-12 custom-modal">
            <div className="custom-modal__header">
              <h3>We have additional moving services should you need </h3>
              <p>
                Select one or more of below services and our sales team will
                contact you.
              </p>
            </div>
            <div className="col-12 custom-modal__body">
              {optionalServices.map((service) => (
                <Form.Check
                  key={service.id}
                  label={service.title}
                  name={service.slug}
                  type="checkbox"
                  value={service.id}
                  id={service.id}
                  className="radioBtn"
                  onChange={selectService}
                />
              ))}
            </div>
            <div className="col-12 auth__bottom-text">
              <p> Additional charges and T&Cs apply</p>
            </div>
            <div className="col-12 custom-modal__footer">
              <Button
                disabled={!selectedServices}
                className="w-100"
                onClick={saveAndContinue}
                variant="secondary"
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

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
                  {currentView === "move" && (
                    <MoveDetails
                      hasDelivery={true}
                      dateLabel={"When would you like to move?"}
                    />
                  )}
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
      <div className="col-12 my-5 pt-3 moves__container__button-container">
        <div className="row w-100">
          <div className="col-2 offset-8">
            <CallMeBackButton title="Call me back" />
          </div>
          <div className="col-2">
            <div className="col-12">
              <Button
                disabled={!canConfirmMove}
                onClick={goToCheckout}
                variant="secondary"
              >
                Confirm move
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalMoveServices;
