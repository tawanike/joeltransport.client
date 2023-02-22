import { useRouter } from "next/router";
import { useState, useContext, FC } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FcInfo } from "react-icons/fc";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
import { ADD_FORM_VALUES } from "src/_models/types";

interface IProps {
    showSelectorModal: boolean;
    setShowSelectorModal: (state: boolean) => void;
}

const HomeMoveModalComponent: FC<IProps> = ({ showSelectorModal, setShowSelectorModal }) => {
    const router = useRouter();
    const [selectType, setSelectType] = useState("auto")
    const { state: bookingState, dispatch: bookingsDispatch } = useContext(BookingContext);
    const [whichAddress, setWhichAddress] = useState<"from" | "to">("from")
    const fetchWrapper = useAPI();

    const isNextActive = () => {
        if (whichAddress === "from") {
            return !(Object.keys(bookingState.formValues).length && bookingState.formValues.from && Object.keys(bookingState.formValues.from).length > 0);
        }
        if (whichAddress === "to") {
            return !(Object.keys(bookingState.formValues).length && bookingState.formValues.to && Object.keys(bookingState.formValues.to).length > 0);
        }
        return false;
    }

    const handleNext = async () => {
        if (whichAddress === "from") {
            setWhichAddress("to");
            return;
        }
        // compare 2 provinces, if they are the same, then redirect to domestic, else international.
        // save to db, create booking.
        // when you have booking id, redirect to move details page.
        // const booking = await bookingsService.createBooking(bookingState.formValues, fetchWrapper);
        // console.log(booking);

        router.push(`/move/domestic`);
        setShowSelectorModal(false);
    }

    const handleAddressChange = (location: any) => {
        bookingsDispatch({ type: ADD_FORM_VALUES, payload: { [whichAddress]: location } })
    }
    return <>
        <Modal show={showSelectorModal} onHide={() => setShowSelectorModal(false)}>
            <Modal.Body>
                <div className="col-12 custom-modal">
                    <div className="custom-modal__header">
                        <h3>Before we get started please provide info below.</h3>
                        <p>Where are you moving {whichAddress}?</p>
                    </div>
                    <div className="col-12 custom-modal__body">
                        <div className="custom-modal__search-address col-12 mb-4">
                            <div className="row">
                                <div className="custom-modal__search-address__tab-container col-6" onClick={() => setSelectType("auto")}>
                                    <div className={`custom-modal__search-address__tab-container__tab
                                        ${selectType === "auto" && "custom-modal__search-address__tab-container__tab--active"} col-12`}>
                                        <p>Auto-search your address</p>
                                    </div>
                                </div>
                                <div className="custom-modal__search-address__tab-container col-6" onClick={() => setSelectType("manual")}>
                                    <div className={`custom-modal__search-address__tab-container__tab
                                        ${selectType === "manual" && "custom-modal__search-address__tab-container__tab--active"} col-12`}>
                                        <p>Manually add your address</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectType === "auto" &&
                            <div className='custom-modal__search-address__auto col-12'>
                                <Form.Group as={Col} md="12" controlId="from">
                                    <Form.Label>Search {whichAddress === "from" ? 'loading' : 'delivery'} address</Form.Label>
                                    <GooglePlacesAutocomplete
                                        apiKey="AIzaSyC_GzK_Vl1Z4sC0-SjAlJd8lzhodDk1coE"
                                        minLengthAutocomplete={5}
                                        selectProps={{
                                            value: bookingState.formValues.from,
                                            onChange: (location: any) => handleAddressChange(location)
                                        }}
                                    />
                                </Form.Group>
                            </div>
                        }
                        {selectType === "manual" &&
                            <div className='custom-modal__search-address__manual col-12'>
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
                                        <Form.Group as={Col} md="6" >
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
                                            <Form.Label>Surbub</Form.Label>
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
                        }
                    </div>

                    <Alert variant="primary" className="mt-3">
                        <div className="row">
                            <div className="col-1" style={{ "display": 'grid', "placeItems": "center", fontSize: "2rem" }}>
                                <FcInfo />
                            </div>
                            <div className="col-11">
                                <b>Please note:</b> Please note: For relocations or storage outside of Gauteng Province, information will be collected and someone will contact you to provide you with a quote.</div>
                        </div>
                    </Alert>

                    <div className="col-12 custom-modal__footer">
                        <Button
                            onClick={handleNext}
                            disabled={isNextActive()}
                            className="w-100"
                            variant="secondary">
                            Next
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
}

export default HomeMoveModalComponent;
