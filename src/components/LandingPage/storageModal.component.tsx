import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FcInfo } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import { getBooking } from "src/_actions/booking.actions";
import { addStorageCount } from "src/_actions/costSummary.actions";
import { BookingContext } from "src/_contexts/booking.context";
import CostSummaryStateContext from "src/_contexts/costSummary.context";
import { addressUtils } from "src/_helpers/formatAddress";
import { useAPI } from "src/_hooks";
import { ADD_FORM_VALUES } from "src/_models/types";
import { bookingsService } from "src/_services/bookings.service";
import AddressManualForm from "./manualForm.component";
interface IProps {
  showStorageModal: boolean;
  setShowStorageModal: (state: boolean) => void;
}
const StorageModalComponent: FC<IProps> = ({
  showStorageModal,
  setShowStorageModal,
}) => {
  const [view, setView] = useState<"delivery" | "address">("delivery");
  const [selectType, setSelectType] = useState("auto");
  const { state: bookingState, dispatch: bookingsDispatch } =
    useContext(BookingContext);
  const { CostSummaryState, dispatchCostSummary } = useContext(
    CostSummaryStateContext
  );
  const [whichAddress] = useState<"from_address">("from_address");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const fetchWrapper = useAPI();
  const collectionOptionView = () => {
    return (
      <>
        <div className="custom-modal__header">
          <h3>Storage that fits your needs</h3>
          <p>Would you prefer we collect your items for you?</p>
        </div>
        <div className="col-12 custom-modal__body">
          <Form.Group as={Col} md="6" className="mt-5">
            <Form.Label>How would you like to proceed?</Form.Label>
            <Form.Check
              type="radio"
              name="from_working_lift"
              label="Yes - collect my items."
              onChange={(event) =>
                bookingsDispatch({
                  type: ADD_FORM_VALUES,
                  payload: {
                    collection: Boolean(Number(event.target.value) as 0 | 1),
                  },
                })
              }
              id="yes"
              value={1}
              className="my-3"
            />
            <Form.Check
              type="radio"
              name="from_working_lift"
              label="No - I will deliver."
              onChange={(event) =>
                bookingsDispatch({
                  type: ADD_FORM_VALUES,
                  payload: {
                    collection: Boolean(Number(event.target.value) as 0 | 1),
                  },
                })
              }
              id="no"
              value={0}
            />
          </Form.Group>
          <div
            className="row custom-modal__footer"
            style={{ borderBottom: "1px solid #ccc" }}
          ></div>
          <div className="row mt-4">
            <div className="col-9 d-flex justify-content-end"></div>
            <div className="col-3">
              <Button
                onClick={handleNext}
                className="w-100"
                variant="secondary"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const handleAddressChange = async (location: any) => {
    const address = await addressUtils.formatAddress(location);
    const to_address = {
      street_address: "10 Von Tonder Street",
      suburb: "Sunderland Ridge",
      city: "Centurion",
      province: "Gauteng",
      postalcode: "0157",
      country: "South Africa",
    };
    bookingsDispatch({
      type: ADD_FORM_VALUES,
      payload: {
        to_address: to_address,
        from_address: address,
        to_address_original: to_address,
        from_address_original: location,
      },
    });
  };

  const addressSelectionView = () => {
    console.log("LOADING", loading);
    return (
      <>
        <div
          className="custom-modal__header"
          style={{ padding: 12, position: "relative" }}
        >
          <button
            onClick={() => setShowStorageModal(false)}
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
          <p>Where are you based?</p>
        </div>
        <div className="col-12 custom-modal__body" style={{ padding: 12 }}>
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
                  <p>Auto-search your location</p>
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
                  <p>Manually add your location</p>
                </div>
              </div>
            </div>
          </div>
          {selectType === "auto" && (
            <div className="custom-modal__search-address__auto col-12">
              <Form.Group as={Col} md="12" controlId="from">
                <Form.Label>Search loading locations</Form.Label>
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
              <div
                className="col-12 pb-3 mb-3 mt-4 custom-modal__footer d-flex justify-content-end"
                style={{ borderBottom: "1px solid #ccc" }}
              >
                <Button
                  onClick={() => {
                    setLoading(true);
                    handleNext();
                  }}
                  disabled={loading}
                  className=""
                  variant="secondary"
                >
                  {loading ? "Loading..." : "Continue"}
                </Button>
              </div>
            </div>
          )}

          {selectType === "manual" && (
            <div className="custom-modal__search-address__manual col-12">
              <AddressManualForm
                moveType={1}
                setWhichAddress={() => false}
                whichAddress={whichAddress}
                setShowSelectorModal={() => false}
                setInternationalMove={() => false}
              />
            </div>
          )}

          {selectType === "manual" || (
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
                    <div className="col-11" style={{ fontSize: 12 }}>
                      <b>Please note:</b> If {"you're"} outside of Gauteng
                      Province, {"we'll"} draw up a quote for you based on your
                      location. {"We'll"} be in touch!
                    </div>
                  </div>
                </div>
              </div>
            </Alert>
          )}
        </div>
      </>
    );
  };

  const handleNext = async () => {
    if (view === "delivery") setView("address");
    else {
      try {
        if (
          !["Gauteng"].includes(bookingState.formValues[whichAddress].province)
        ) {
          router.push("/contact-us");
          return;
        }

        delete bookingState.formValues.move_date;
        const booking = await bookingsService.createBooking(
          bookingState.formValues,
          fetchWrapper
        );
        console.log("BOOKING", booking);

        bookingsDispatch(getBooking(booking));
        if (bookingState.formValues.move_type === 1) {
          // Update Cost summary
          if (booking.products.length > 0) {
            booking.products.find((product: any) => {
              if (product.title === "Storage") {
                dispatchCostSummary(
                  addStorageCount({
                    quantity: product.quantity,
                    price: product.price,
                  })
                );
              }
            });
          }
        }
        localStorage.setItem("bookingId", booking.id);
        router.push(`/storage`);
      } catch (error) {
        setLoading(false);
      }
    }

    return;
  };

  return (
    <>
      <Modal show={showStorageModal} onHide={() => setShowStorageModal(false)}>
        <Modal.Body>
          <div className="col-12 custom-modal" style={{ padding: 0 }}>
            {view === "delivery"
              ? collectionOptionView()
              : addressSelectionView()}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default StorageModalComponent;
