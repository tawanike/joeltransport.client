import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FcInfo } from "react-icons/fc";
import { getBooking } from "src/_actions/booking.actions";
import { BookingContext } from "src/_contexts/booking.context";
import { addressUtils } from "src/_helpers/formatAddress";
import { useAPI } from "src/_hooks";
import { ADD_FORM_VALUES, IFormValues } from "src/_models/types";
import { bookingsService } from "src/_services/bookings.service";
import AddressManualForm from "./manualForm.component";

interface IProps {
  showSelectorModal: boolean;
  setShowSelectorModal: (state: boolean) => void;
}

const HomeMoveModalComponent: FC<IProps> = ({
  showSelectorModal,
  setShowSelectorModal,
}) => {
  const router = useRouter();
  const [internationalMove, setInternationalMove] = useState(false);
  const [selectType, setSelectType] = useState("auto");
  const { state: bookingState, dispatch: bookingsDispatch } =
    useContext(BookingContext);
  const [whichAddress, setWhichAddress] = useState<
    "from_address" | "to_address"
  >("from_address");
  const fetchWrapper = useAPI();

  const isNextActive = () => {
    if (whichAddress === "from_address") {
      return !(
        Object.keys(bookingState.formValues).length &&
        bookingState.formValues.from_address &&
        Object.keys(bookingState.formValues.from_address).length > 0
      );
    }
    if (whichAddress === "to_address") {
      return !(
        Object.keys(bookingState.formValues).length &&
        bookingState.formValues.to_address &&
        Object.keys(bookingState.formValues.to_address).length > 0
      );
    }
    return false;
  };

  const handleNext = async () => {
    if (whichAddress === "from_address") {
      setWhichAddress("to_address");
      return;
    }
    // compare 2 provinces, if they are the same, then redirect to domestic, else international.
    // save to db, create booking.
    // when you have booking id, redirect to move details page.
    delete bookingState.formValues.move_date;
    const booking = await bookingsService.createBooking(
      bookingState.formValues,
      fetchWrapper
    );
    bookingsDispatch(getBooking(booking));
    localStorage.setItem("bookingId", booking.id);
    if (
      bookingState.formValues.from_address?.province === "Gauteng" &&
      bookingState.formValues.to_address?.province === "Gauteng"
    ) {
      router.push(`/move/domestic`);
      setShowSelectorModal(false);
    } else {
      setInternationalMove(true);
    }
  };

  const handleAddressChange = async (location: any) => {
    const address = await addressUtils.formatAddress(location);
    const original_location = [whichAddress] + "_original";
    bookingsDispatch({
      type: ADD_FORM_VALUES,
      payload: { [whichAddress]: address, [original_location]: location },
    });
  };

  const address_types = {
    from_address: "from",
    to_address: "to",
  };

  const handleMoveOptionChange = (e: any) => {
    if (e.target.value === "call_back") {
      router.push(`/contact-us`);
      setShowSelectorModal(false);
    }

    if (e.target.value === "form") {
      router.push(`/move/inventory-form`);
      setShowSelectorModal(false);
    }
  };

  useEffect(() => {
    bookingsDispatch({
      type: ADD_FORM_VALUES,
      payload: { move_type: 0 } as IFormValues,
    });
    console.log(bookingState);
  }, []);

  return (
    <>
      <Modal
        show={showSelectorModal}
        onHide={() => setShowSelectorModal(false)}
      >
        {!internationalMove ? (
          <Modal.Body>
            <div className="col-12 custom-modal">
              <div className="custom-modal__header">
                <h3>Before we get started please provide info below.</h3>
                <p>Where are you moving {address_types[whichAddress]}?</p>
              </div>
              <div className="col-12 custom-modal__body">
                <div className="custom-modal__search-address col-12 mb-4">
                  <div className="row">
                    <div className="col-12 custom-modal__body">
                      <div className="custom-modal__search-address col-12">
                        <div className="row">
                          <div
                            className="custom-modal__search-address__tab-container col-6"
                            onClick={() => setSelectType("auto")}
                          >
                            <div
                              className={`custom-modal__search-address__tab-container__tab ${
                                selectType === "auto" &&
                                "custom-modal__search-address__tab-container__tab--active"
                              } col-12`}
                            >
                              <p>Auto-search your address</p>
                            </div>
                          </div>
                          <div
                            className="custom-modal__search-address__tab-container col-6"
                            onClick={() => setSelectType("manual")}
                          >
                            <div
                              className={`custom-modal__search-address__tab-container__tab ${
                                selectType === "manual" &&
                                "custom-modal__search-address__tab-container__tab--active"
                              } col-12`}
                            >
                              <p>Manually add your address</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectType === "auto" && (
                  <>
                    <div className="custom-modal__search-address__auto col-12">
                      <Form.Group as={Col} md="12" controlId="from">
                        <Form.Label>
                          Search{" "}
                          {whichAddress === "from_address"
                            ? "loading"
                            : "delivery"}{" "}
                          address
                        </Form.Label>
                        <GooglePlacesAutocomplete
                          apiKey="AIzaSyBZfdpoBUniKbSIq_5YWdykaoOnADrsPjs"
                          minLengthAutocomplete={5}
                          selectProps={{
                            value:
                              bookingState.formValues[
                                `${whichAddress}_original` as keyof IFormValues
                              ],
                            onChange: (location: any) => {
                              handleAddressChange(location);
                            },
                          }}
                        />
                      </Form.Group>
                    </div>
                    <Alert variant="primary" className="mt-3">
                      <div className="row">
                        <div className="col-12 Selector__instructions__get-started">
                          <div className="row">
                            <div
                              className="col-1"
                              style={{
                                display: "grid",
                                placeItems: "center",
                                fontSize: "2rem",
                              }}
                            >
                              <FcInfo />
                            </div>
                            <div className="col-11">
                              <b>Please note:</b> Please note: For relocations
                              or storage outside of Gauteng Province,
                              information will be collected and someone will
                              contact you to provide you with a quote.
                            </div>
                          </div>
                        </div>
                      </div>
                    </Alert>

                    <div className="col-12 custom-modal__footer">
                      <Button
                        onClick={handleNext}
                        disabled={isNextActive()}
                        className="w-100"
                        variant="secondary"
                      >
                        Next
                      </Button>
                    </div>
                  </>
                )}
                {selectType === "manual" && (
                  <div className="custom-modal__search-address__manual col-12">
                    <AddressManualForm
                      setWhichAddress={setWhichAddress}
                      whichAddress={whichAddress}
                      setShowSelectorModal={setShowSelectorModal}
                      setInternationalMove={setInternationalMove}
                    />
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <div className="col-12 custom-modal">
              <div className="custom-modal__header mb-5">
                <h3>{"Let's help you book a home move."}</h3>
                <p>How would you like to proceed?</p>
              </div>
              <div className="col-12 custom-modal__body">
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <li className="mb-4">
                    <Form.Check
                      name="moveOption"
                      value="chat"
                      type="radio"
                      label="Chat to us now to book your long distance home move"
                      id=""
                      onChange={handleMoveOptionChange}
                    />
                  </li>
                  <li className="mb-4">
                    <Form.Check
                      name="moveOption"
                      value="call_back"
                      type="radio"
                      label="Request a call me back to book your long distance move"
                      id=""
                      onChange={handleMoveOptionChange}
                    />
                  </li>
                  <li className="mb-4">
                    <Form.Check
                      name="moveOption"
                      value="form"
                      type="radio"
                      label="Fill-in an online inventory form"
                      id=""
                      onChange={handleMoveOptionChange}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default HomeMoveModalComponent;
