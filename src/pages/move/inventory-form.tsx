import AddedServices from "components/moves/addedServices.component";
import InventoryForm from "components/moves/inventoryForm.component";
import MoveDetails from "components/moves/moveDetails.component";
import PersonalInformation from "components/moves/personalInfomation.componnent";
import CallMeBackButton from "components/shared/callMeBackButton.component";
import { CoverImage } from "components/ui";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Alert, Breadcrumb, Button, Form, Modal } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import { FcInfo } from "react-icons/fc";
import { RxCaretDown } from "react-icons/rx";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
import { EDIT_ADDITIONAL_SERVICES, IBooking } from "src/_models/types";

const InternationalMoveServices = () => {
  const router = useRouter();
  const fetchWrapper = useAPI();
  const [show, setShow] = useState(false);
  const [currentView, setCurrentView] = useState("");
  const [showSelectorModal, setShowSelectorModal] = useState(false);
  const [optionalServices, setOptionalServices] = useState<any[]>([]);
  const [selectedServices] = useState([]);
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
    setShowSelectorModal(true);
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

  const isDisabled = (state: IBooking) => {
    const objKeys = Object.keys(state.formValues);
    let userVals = true;
    const formVals = ["move_date"].some((x) => {
      const xVal = state.formValues[x as keyof typeof state.formValues];
      return (
        xVal === null ||
        xVal === "" ||
        xVal === false ||
        xVal === 0 ||
        xVal?.length === 0 ||
        xVal === undefined
      );
    });
    if (state.formValues.user) {
      userVals = ["first_name", "last_name", "email", "phone_number"].some(
        (x) => {
          const xVal =
            state.formValues.user[x as keyof typeof state.formValues.user];
          return (
            xVal === null ||
            xVal === "" ||
            xVal?.length === 0 ||
            xVal === undefined
          );
        }
      );
    }
    const invVals = state.inventoryList.length > 0;
    return formVals || userVals || !invVals;
  };

  return (
    <div className="moves container-fluid">
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <div className="col-12 py-5">
            <div className="row">
              <div className="col-12 resources__modal__icon">
                <BsCheckCircle />
              </div>
              <div className="col-10 mx-5 resources__modal__head mt-3 text-center">
                <h5>Sent!</h5>
              </div>
              <div className="col-8 offset-2 resources__modal__text mt-3">
                <p>
                  We’ve popped you an email confirming your moving requirements.
                </p>
              </div>
              <div className="col-12 resources__modal__button mt-3">
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
          <div className="col-12 custom-modal" style={{ padding: 0 }}>
            <div className="custom-modal__header">
              <h3>We’re here for you!</h3>
              <p>Do you require any of our specialised moving services?</p>
            </div>
            <div className="col-12 custom-modal__body" style={{ padding: 12 }}>
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
            <div
              className="row pb-3 mb-3 mt-3 custom-modal__footer"
              style={{ borderBottom: "1px solid #ccc" }}
            >
              <div className="col-12 d-flex justify-content-end">
                <Button
                  disabled={!selectedServices}
                  className=""
                  onClick={saveAndContinue}
                  variant="secondary"
                >
                  Continue
                </Button>
              </div>
              <div className="mt-4 mb-4 d-flex justify-content-center">
                <div
                  style={{
                    height: 4,
                    width: 32,
                    backgroundColor: "red",
                    borderRadius: 4,
                    marginRight: 4,
                  }}
                ></div>
                <div
                  style={{
                    height: 4,
                    width: 24,
                    backgroundColor: "gray",
                    borderRadius: 4,
                  }}
                ></div>
              </div>
            </div>

            <Alert variant="info" style={{ padding: 8 }}>
              <div className="row">
                <div
                  className="col-1"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  <FcInfo />
                </div>
                <div className="col-11" style={{ fontSize: 12 }}>
                  <b>Please note:</b> There may be additional charges. Terms and
                  conditions apply.
                </div>
              </div>
            </Alert>
          </div>
        </Modal.Body>
      </Modal>

      <CoverImage
        size="medium"
        src="/img/kaleb.png"
        pageTitle="Move services"
        description="Are you ready for a change?"
        subtitle="Let’s make it happen!"
        variant="--domestic"
      />

      <div className="moves__container container mt-5">
        <div className="row">
          <div className="col-12 my-5">
            <Breadcrumb>
              <Breadcrumb.Item onClick={() => router.push("/")}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Home move</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="col-12 mb-5">
            <h2>Book a home move</h2>
          </div>
          <div className="col-12 col-md-8">
            <div className="col-12 moves__stepper">
              <div className="moves__step col-12 mb-3">
                <div className="row">
                  <div
                    className="col-12 moves__step__head"
                    onClick={() => toggleView("move")}
                  >
                    <div className="row">
                      <div className="col-11">
                        <p>Moving details</p>
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
                        <p>Home Inventory form</p>
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
                        <p>Added services</p>
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
                        <p>Personal information</p>
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
          <div className="col-12 my-5 pt-3 moves__container__button-container">
            <div className="row w-100">
              <div className="col-12 d-flex justify-content-end">
                <CallMeBackButton title="Call me back" />
                <Button
                  disabled={isDisabled(bookingState)}
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
    </div>
  );
};

export default InternationalMoveServices;
