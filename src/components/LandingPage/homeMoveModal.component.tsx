import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FcInfo } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import { getBooking } from "src/_actions/booking.actions";
import { BookingContext } from "src/_contexts/booking.context";
import { addressUtils } from "src/_helpers/formatAddress";
import { useAPI } from "src/_hooks";
import { ADD_FORM_VALUES } from "src/_models/types";
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
    localStorage.removeItem("bookingId");
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

  return (
    <>
      <Modal
        show={showSelectorModal}
        onHide={() => setShowSelectorModal(false)}
      >
        {!internationalMove ? (
          <Modal.Body>
            <div className="col-12 custom-modal" style={{ padding: 0 }}>
              <div
                className="custom-modal__header"
                style={{ padding: 12, position: "relative" }}
              >
                <button
                  onClick={() => setShowSelectorModal(false)}
                  style={{
                    display: "flex",
                    position: "absolute",
                    right: 12,
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    padding: 2,
                    height: 20,
                    width: 20,
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                  }}
                >
                  <MdClose />
                </button>
                <h3>Help us get started by filling in your details below.</h3>
                {/* <p>Where are you moving {address_types[whichAddress]}?</p> */}
                <p>Where are you based?</p>
              </div>
              <div className="col-12 custom-modal__body">
                <div className="col-12 mb-4">
                  <div className="row">
                    <div
                      className="col-12 custom-modal__body"
                      style={{ padding: 12 }}
                    >
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
                              <p>Auto-search your location</p>
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
                              <p>Manually add your location</p>
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
                          location
                        </Form.Label>
                        <GooglePlacesAutocomplete
                          apiKey="AIzaSyBZfdpoBUniKbSIq_5YWdykaoOnADrsPjs"
                          minLengthAutocomplete={5}
                          selectProps={{
                            value: {
                              value: bookingState.formValues[whichAddress]
                                ? bookingState.formValues[whichAddress].place_id
                                : "",
                              label: bookingState.formValues[whichAddress]
                                ? bookingState.formValues[whichAddress]
                                    .formatted_address
                                : null,
                            },
                            onChange: (location: any) => {
                              handleAddressChange(location);
                            },
                          }}
                        />
                      </Form.Group>
                    </div>

                    <div
                      className="row pb-3 mb-3 mt-4 custom-modal__footer"
                      style={{ borderBottom: "1px solid #ccc" }}
                    >
                      <div className="col-12 d-flex justify-content-end">
                        <Button
                          onClick={handleNext}
                          disabled={isNextActive()}
                          className=""
                          variant="secondary"
                        >
                          Continue
                        </Button>
                      </div>
                      <div className="mt-3 mb-4 d-flex justify-content-center">
                        <div
                          style={{
                            height: 4,
                            width: 32,
                            backgroundColor: "#FA551E",
                            borderRadius: 4,
                            marginRight: 4,
                          }}
                        ></div>
                        <div
                          style={{
                            height: 4,
                            width: 24,
                            backgroundColor: "#979797",
                            borderRadius: 4,
                          }}
                        ></div>
                      </div>
                    </div>
                    <Alert variant="info" className="mt-3">
                      <div className="row">
                        <div className="col-12 Selector__instructions__get-started">
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
                            <div className="col-11">
                              <b>Please note:</b> If {"you're"} outside of
                              Gauteng Province, {"we'll"} draw up a quote for
                              you based on your location. {"We'll"} be in touch!
                            </div>
                          </div>
                        </div>
                      </div>
                    </Alert>
                  </>
                )}
                {selectType === "manual" && (
                  <div className="custom-modal__search-address__manual col-12">
                    <AddressManualForm
                      moveType={0}
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
                      label="Request a call"
                      id=""
                      onChange={handleMoveOptionChange}
                    />
                  </li>
                  <li className="mb-4">
                    <Form.Check
                      name="moveOption"
                      value="form"
                      type="radio"
                      label="Fill in an online inventory form"
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
