import MoveStepper from "components/moves/move-stepper.component";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BookingContext } from "src/_contexts/booking.context";
import useAPI from "../../_hooks/useAPI";
import {
    ADD_FORM_VALUES,
    ADD_PRODUCTS_DATA,
    EDIT_ADDITIONAL_SERVICES,
} from "../../_models/types";
import { productService } from "../../_services/product.service";
import MoveCostCard from "../../components/moves/moveCostCard.component";
import CallMeBackButton from "../../components/shared/callMeBackButton.component";
import { CoverImage } from "../../components/ui";

const DomesticMoveServices = () => {
    const [optionalServices, setOptionalServices] = useState<any[]>([]);
    const [canConfirmMove, setCanConfirmMove] = useState(true);
    const fetchWrapper = useAPI();
    const { state: bookingState, dispatch: dispatchBookings } =
        useContext(BookingContext);
    const [showSelectorModal, setShowSelectorModal] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getProducts = async () => {
            const products = await productService.getProducts(fetchWrapper);
            dispatchBookings({ type: ADD_PRODUCTS_DATA, payload: products.results });
        };

        const getOptionalServices = async () => {
            const optionalServices = await fetchWrapper.get(
                "/products/optional-services",
                false
            );
            setOptionalServices(optionalServices.results);
        };

        dispatchBookings({
            type: ADD_FORM_VALUES,
            payload: { move_type: 0 },
        });

        getProducts();
        getOptionalServices();
    }, []);

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
                category: 0,
                selected: e.target.checked,
            }
        );
    };

    const saveAndContinue = () => {
        router.push(`/move/checkout`);
    };

    useEffect(() => {
        const canConfirmMove = Object.values(bookingState.formValues).every(
            (value) => {
                console.log(value);

                return value !== null && value !== ""
            }
        );
        setCanConfirmMove(canConfirmMove);
    }, [bookingState.formValues])


    return (
        <>
            <div className="moves container-fluid">
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
                            <h2>Book a home move</h2>
                            {/* <p>
                                To provide you with the best quote, we need some information
                                about you Once you are happy with your quote, you will need to
                                log in or create an account to pay
                            </p> */}
                        </div>
                        <div className="col-7">
                            <MoveStepper />
                        </div>
                        <div className="col-4 offset-1">
                            <MoveCostCard />
                        </div>
                        <div className="col-12 my-5 pt-3 moves__container__button-container">
                            <div className="row w-100">
                                <div className="col-1 offset-7">

                                </div>
                                <div className="col-4">
                                    <div className="col-8 offset-4">
                                        <CallMeBackButton title="Call me back" />
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
                </div>
            </div>
        </>
    );
};

export default DomesticMoveServices;
