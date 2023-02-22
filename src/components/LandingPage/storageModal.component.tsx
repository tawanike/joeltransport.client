import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

interface IProps {
    showStorageModal: boolean;
    setShowStorageModal: (state: boolean) => void;
}
const StorageModalComponent: FC<IProps> = ({ showStorageModal, setShowStorageModal }) => {
    const [view, setView] = useState<"delivery" | "address">("delivery")
    const [selectType, setSelectType] = useState("auto")
    const router = useRouter();
    const collectionOptionView = () => {
        return <>
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
                        // onChange={(event) => bookingsDispatch({ type: ADD_FORM_VALUES, payload: { 'from_working_lift': event.target.value } })}
                        id="yes"
                        value={1}
                        className="my-3"
                    // checked={Number(bookingState.formValues.from_working_lift) === 1}
                    />
                    <Form.Check
                        type="radio"
                        name="from_working_lift"
                        label="No - I will deliver."
                        // onChange={(event) => bookingsDispatch({ type: ADD_FORM_VALUES, payload: { 'from_working_lift': event.target.value } })}
                        id="no"
                        value={0}
                    // checked={Number(bookingState.formValues.from_working_lift) === 0}
                    />
                </Form.Group>
            </div>
        </>
    }

    const addressSelectionView = () => {
        return <>
            <div className="custom-modal__header">
                <h3>Before we get started please provide info below.</h3>
                <p>Where are you based?</p>
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
                            <Form.Label>Search loading address</Form.Label>
                            <GooglePlacesAutocomplete
                                apiKey="AIzaSyC_GzK_Vl1Z4sC0-SjAlJd8lzhodDk1coE"
                                minLengthAutocomplete={5}
                            // selectProps={{
                            //     value: bookingState.formValues.from,
                            //     onChange: (location: any) => handleAddressChange(location)
                            // }}
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
        </>
    }

    const handleNext = async () => {
        if (view === "delivery") {
            setView("address");
            return;
        }
        router.push(`/storage`);
        setShowStorageModal(false);
    }

    return <>
        <Modal show={showStorageModal} onHide={() => setShowStorageModal(false)}>
            <Modal.Body>
                <div className="col-12 custom-modal">
                    {view === "delivery" ? collectionOptionView() : addressSelectionView()}
                    <div className="col-12 custom-modal__footer">
                        <Button
                            onClick={handleNext}
                            // disabled={isNextActive()}
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

export default StorageModalComponent;
