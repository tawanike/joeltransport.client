import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FcInfo } from "react-icons/fc";
import { getBooking } from "src/_actions/booking.actions";
import { BookingContext } from "src/_contexts/booking.context";
import { addressUtils } from "src/_helpers/formatAddress";
import { useAPI } from "src/_hooks";
import { ADD_FORM_VALUES } from "src/_models/types";
import { bookingsService } from "src/_services/bookings.service";
import {
  SelectorConfig,
  selectorConfig,
} from "../../_configurations/selectors.config";

const Selector = () => {
  const router = useRouter();
  const [selectedView, setSelectedView] = useState(() => selectorConfig[0]);
  const [showSelectorModal, setShowSelectorModal] = useState(false);
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
    } else {
      router.push(`/move/international`);
    }

    setShowSelectorModal(false);
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
  return (
    <div className="selectorContainer container">
      <Modal
        show={showSelectorModal}
        onHide={() => setShowSelectorModal(false)}
      >
        <Modal.Body>
          <div className="col-12 custom-modal">
            <div className="custom-modal__header">
              <h3>Before we get started please provide info below.</h3>
              <p>Where are you moving {address_types[whichAddress]}?</p>
            </div>
            <div className="col-12 custom-modal__body">
              <div className="custom-modal__search-address col-12 mb-4">
                <div className="row">
                  <div
                    className="custom-modal__search-address__tab-container col-6"
                    onClick={() => setSelectType("auto")}
                  >
                    <div
                      className={`custom-modal__search-address__tab-container__tab
                                        ${
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
                      className={`custom-modal__search-address__tab-container__tab
                                        ${
                                          selectType === "manual" &&
                                          "custom-modal__search-address__tab-container__tab--active"
                                        } col-12`}
                    >
                      <p>Manually add your address</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectType === "auto" && (
                <div className="custom-modal__search-address__auto col-12">
                  <Form.Group as={Col} md="12" controlId="from">
                    <Form.Label>
                      Search{" "}
                      {whichAddress === "from_address" ? "loading" : "delivery"}{" "}
                      address
                    </Form.Label>
                    <GooglePlacesAutocomplete
                      apiKey="AIzaSyC_GzK_Vl1Z4sC0-SjAlJd8lzhodDk1coE"
                      minLengthAutocomplete={5}
                      selectProps={{
                        value: "",
                        onChange: (location: any) =>
                          handleAddressChange(location),
                      }}
                    />
                  </Form.Group>
                </div>
              )}
              {selectType === "manual" && (
                <div className="custom-modal__search-address__manual col-12">
                  <Form noValidate>
                    <Row className="mt-5">
                      <Form.Group as={Col} md="6">
                        <Form.Label>Unit number</Form.Label>
                        <Form.Control
                          type="text"
                          name="unit_number"
                          placeholder="Unit number"
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6">
                        <Form.Label>Complex name</Form.Label>
                        <Form.Control
                          type="text"
                          name="complex_name"
                          placeholder="Complex name"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-5">
                      <Form.Group as={Col} md="6">
                        <Form.Label>Street address</Form.Label>
                        <Form.Control
                          type="text"
                          name="street_address"
                          placeholder="Street address"
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6">
                        <Form.Label>Suburb</Form.Label>
                        <Form.Control
                          type="text"
                          name="surbab"
                          placeholder="Surbab"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-5">
                      <Form.Group as={Col} md="6">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          placeholder="City"
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6">
                        <Form.Label>Postal code</Form.Label>
                        <Form.Control
                          type="text"
                          name="postal_code"
                          placeholder="Postal code"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-5">
                      <Form.Group as={Col} md="6">
                        <Form.Label>Province</Form.Label>
                        <Form.Control
                          type="text"
                          name="province"
                          placeholder="Province"
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          name="country"
                          placeholder="Country"
                        />
                      </Form.Group>
                    </Row>
                  </Form>
                </div>
              )}
            </div>

            <Alert variant="primary" className="mt-3">
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
                  <b>Please note:</b> Please note: For relocations or storage
                  outside of Gauteng Province, information will be collected and
                  someone will contact you to provide you with a quote.
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
          </div>
        </Modal.Body>
      </Modal>
      <div className="Selector__options">
        {selectorConfig.map((selector: SelectorConfig) => (
          <Button
            key={selector.id}
            variant={`${
              selectedView.id === selector.id ? "primary" : "outline-primary"
            }`}
            className="Selector__button"
            onClick={() => setSelectedView(selector)}
          >
            {selector.title}
          </Button>
        ))}
      </div>
      <div className="Selector__instructions row">
        <div className="col-12 col-md-9 Selector__instructions__text">
          <div>
            <h4>{selectedView.heading}</h4>
            {/* <p>{selectedView.description}</p> */}
          </div>
        </div>
        <div className="col-12 col-md-3 Selector__instructions__get-started">
          <button
            className="button button-secondary"
            onClick={() => setShowSelectorModal(true)}
          >
            Get a quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selector;
