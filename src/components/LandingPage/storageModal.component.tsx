import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { getBooking } from "src/_actions/booking.actions";
import { BookingContext } from "src/_contexts/booking.context";
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
  const [whichAddress] = useState<"from_address">("from_address");

  const router = useRouter();
  const fetchWrapper = useAPI();
  const collectionOptionView = () => {
    return (
      <>
        <div className="custom-modal__header">
          <h3>Let’s help you book a storage.</h3>
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
                    deliver_to_storage: Boolean(
                      Number(event.target.value) as 0 | 1
                    ),
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
                    deliver_to_storage: Boolean(
                      Number(event.target.value) as 0 | 1
                    ),
                  },
                })
              }
              id="no"
              value={0}
            />
          </Form.Group>
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
    return (
      <>
        <div className="custom-modal__header">
          <h3>Before we get started please provide info below.</h3>
          <p>Where are you based?</p>
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
                <Form.Label>Search loading address</Form.Label>
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
          )}
          {selectType === "manual" && (
            <div className="custom-modal__search-address__manual col-12">
              <AddressManualForm
                moveType="storage"
                setWhichAddress={() => false}
                whichAddress={whichAddress}
                setShowSelectorModal={() => false}
                setInternationalMove={() => false}
              />
            </div>
          )}
        </div>
      </>
    );
  };

  const handleNext = async () => {
    if (view === "delivery") setView("address");
    else {
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
      bookingsDispatch(getBooking(booking));
      localStorage.setItem("bookingId", booking.id);
      router.push(`/storage`);
    }
    return;
  };

  return (
    <>
      <Modal show={showStorageModal} onHide={() => setShowStorageModal(false)}>
        <Modal.Body>
          <div className="col-12 custom-modal">
            {view === "delivery"
              ? collectionOptionView()
              : addressSelectionView()}
            <div className="col-12 custom-modal__footer">
              <Button
                onClick={handleNext}
                // disabled={isNextActive()}
                className="w-100"
                variant="secondary"
              >
                Next
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default StorageModalComponent;
