import StorageStepper from "components/moves/storage-stepper.component";
import StorageCostCard from "components/moves/storageCostCard.component";
import CallMeBackButton from "components/shared/callMeBackButton.component";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { BookingContext } from "src/_contexts/booking.context";
import { IBooking } from "src/_models/types";
import { CoverImage } from "../../components/ui";

const Storage = () => {
    const router = useRouter();
    const { state: bookingState, dispatch: dispatchBookings } =
        useContext(BookingContext);

    const goToCheckout = () => {
        router.push("/move/checkout");
    };

    const isDisabled = (state: IBooking) => {
        const objKeys = Object.keys(state.formValues);
        let userVals = true;
        const formVals = ['move_date'].some(x => {
            const xVal = state.formValues[x as keyof typeof state.formValues];
            return xVal === null || xVal === "" || xVal === false || xVal === 0 || xVal?.length === 0 || xVal === undefined;
        });
        if (state.formValues.user) {
            userVals = ['first_name', 'last_name', 'email', 'phone_number'].some(x => {
                const xVal = state.formValues.user[x as keyof typeof state.formValues.user];
                return xVal === null || xVal === "" || xVal?.length === 0 || xVal === undefined;
            });
        }
        return formVals || userVals;
    }
    return (
        <div className="Resources container-fluid">
            <CoverImage
                size="medium"
                src="/img/storage.png"
                pageTitle="Storage unit"
                variant="--storage"
                description="We offer secure storage facilities for our customers, that suit specific requirements."
            />

            <div className="Resources__documents">
                <div className="moves__container container mt-5">
                    <div className="row">
                        <div className="col-12 mb-5">
                            <h2>Get a storage unit for your items</h2>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="row">
                                <div className="col-6 moves__container__thumbnail">
                                    <img src="/img/storage_thumb.png" alt="storage" />
                                </div>
                                <div className="col-6 moves__container__summary">
                                    <div>
                                        <p>
                                            <b>Storage type: wooden crate unit </b>
                                        </p>
                                        <p>
                                            <b>Storage units size: 6 m2</b>
                                        </p>
                                        <p className="price">
                                            <span>R350 pm</span> excl.VAT
                                        </p>
                                        <p>
                                            Each storage unit can fit items in a one-bedroom bachelor
                                            apartment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-12">
                                    <StorageStepper />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-5 offset-lg-1">
                            <StorageCostCard />
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
        </div>
    );
};

export default Storage;
