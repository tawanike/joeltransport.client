import accounting from "accounting";
import MoveStepper from "components/moves/move-stepper.component";
import StorageStepper from "components/moves/storage-stepper.component";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import { MdWarning } from "react-icons/md";
import { usePaystackPayment } from "react-paystack";
import { BookingContext } from "src/_contexts/booking.context";
import CostSummaryStateContext from "src/_contexts/costSummary.context";
import { CHANGE_OPEN_SECTION } from "src/_models/types";
import { Calculations } from "../../_helpers/calculations";
accounting.settings = {
  currency: {
    symbol: "R", // default currency symbol is '$'
    format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
    decimal: ".", // decimal point separator
    thousand: ",", // thousands separator
    precision: 2, // decimal places
  },
  number: {
    precision: 0, // default precision on numbers is 0
    thousand: ",",
    decimal: ".",
  },
};

const Checkout = () => {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const bookingContext = useContext(BookingContext);
  const { CostSummaryState, dispatchCostSummary } = useContext(
    CostSummaryStateContext
  );

  const paystackConfig = {
    reference: bookingContext.state.formValues.id,
    email: bookingContext.state.formValues.user?.email || "",
    amount: Calculations.getTotalInCents(
      bookingContext.state.formValues.products,
      CostSummaryState
    ),
    currency: "ZAR",
    publicKey: "pk_test_031a560a948c05f7721f754c86ed89d4335d5250",
  };

  const initializePayment = usePaystackPayment(paystackConfig as any);
  const onSuccess: any = (reference: any) => {
    setShowSuccessModal(true);
    localStorage.removeItem("bookingId");
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    dispatchCostSummary({ type: "RESET_BOOKING" });
    bookingContext.dispatch({ type: "RESET_COST_SUMMARY" });
    window.location.href = "/";
  };

  const onClose = () => {
    console.log("closed");
  };

  return (
    <>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Body>
          <div className="col-12 py-5">
            <div className="row">
              <div className="col-12 resources__modal__icon">
                <BsCheckCircle />
              </div>
              <div className="col-12 resources__modal__head mt-4">
                <h3>Payment successful</h3>
              </div>
              <div className="col-8 offset-2 resources__modal__text mt-4">
                <p>
                  Your move has been booked, please check your email for further
                  communications.
                </p>
              </div>
              <div className="col-12 resources__modal__button mt-4">
                <Button
                  variant="secondary"
                  className="col-4"
                  onClick={handleDone}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="moves container-fluid">
        <div className="moves__container container mt-5">
          <div className="row">
            <div className="col-12 col-md-8">
              <Alert variant="warning" className="mt-3">
                <div className="row">
                  <div
                    className="col-1"
                    style={{
                      display: "grid",
                      placeItems: "center",
                      fontSize: "2rem",
                      color: "#fa551e",
                    }}
                  >
                    <MdWarning />
                  </div>
                  <div className="col-11">
                    Please note: Booking for your move dates is only valid after
                    payment confirmation.
                  </div>
                </div>
              </Alert>
              {bookingContext.state.formValues.move_type === 0 ? (
                <MoveStepper />
              ) : (
                <StorageStepper />
              )}
            </div>
            <div className="col-12 col-md-3 offset-md-1 moves__checkout">
              <div className="col-12 moves__checkout__summary">
                {bookingContext.state.formValues.move_type === 0 ? (
                  <h5>Move summary</h5>
                ) : (
                  <h5>Storage summary</h5>
                )}
                <div className="row">
                  <div className="col-12 moves__checkout__summary__list mt-3">
                    <div className="row">
                      <div className="col-6 moves__checkout__summary__list__text">
                        <p>Items</p>
                      </div>
                      <div className="col-6 moves__checkout__summary__list__price">
                        {accounting.formatMoney(
                          Calculations.getTotal(
                            bookingContext.state.formValues.products,
                            CostSummaryState
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 moves__checkout__summary__list moves__checkout__summary__list--bold mt-3">
                    <div className="row">
                      <div className="col-6 moves__checkout__summary__list__text">
                        <p>Total</p>
                      </div>
                      <div className="col-6 moves__checkout__summary__list__price">
                        {accounting.formatMoney(
                          Calculations.getTotal(
                            bookingContext.state.formValues.products,
                            CostSummaryState
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="success"
                    className="mt-3 p-2"
                    onClick={() => {
                      initializePayment(onSuccess, onClose);
                    }}
                  >
                    Pay{" "}
                    {accounting.formatMoney(
                      Calculations.getTotal(
                        bookingContext.state.formValues.products,
                        CostSummaryState
                      )
                    )}
                  </Button>
                </div>
              </div>
              <div className="col-12 moves__checkout__image my-4">
                <img src="/img/pay.png" alt="Checkout" />
              </div>
              <div className="col-12 d-sm-none moves__checkout__summary">
                {bookingContext.state.formValues.move_type === 0 ? (
                  <h5>Move review</h5>
                ) : (
                  <h5>Storage review</h5>
                )}
                <div className="row">
                  <div className="col-12 moves__checkout__summary__list mt-3">
                    <div className="row">
                      <div className="col-6 moves__checkout__summary__list__text">
                        <p>Date</p>
                        <p>{bookingContext.state.formValues.move_date}</p>
                      </div>
                      <div
                        className="col-6 moves__checkout__summary__list__edit"
                        onClick={() =>
                          bookingContext.dispatch({
                            type: CHANGE_OPEN_SECTION,
                            payload: { openSection: "move_details" },
                          })
                        }
                      >
                        Edit
                      </div>
                    </div>
                  </div>
                  <div className="col-12 moves__checkout__summary__list mt-3">
                    <div className="row">
                      <div className="col-6 moves__checkout__summary__list__text">
                        <p className="moves__checkout__summary__list__text--bold">
                          Move details
                        </p>
                        <p>
                          {bookingContext.state.formValues?.user?.first_name}{" "}
                          {bookingContext.state.formValues?.user?.last_name}
                        </p>
                      </div>
                      <div
                        className="col-6 moves__checkout__summary__list__edit"
                        onClick={() =>
                          bookingContext.dispatch({
                            type: CHANGE_OPEN_SECTION,
                            payload: { openSection: "move_details" },
                          })
                        }
                      >
                        Edit
                      </div>
                      <div className="col-12 moves__checkout__summary__list__text mt-3">
                        <p className="moves__checkout__summary__list__text--bold">
                          Moving from
                        </p>
                        <p>
                          {
                            bookingContext.state.formValues?.from_address
                              ?.formatted_address
                          }
                        </p>
                      </div>
                      {bookingContext.state.formValues.move_type === 0 && (
                        <div className="col-12 moves__checkout__summary__list__text mt-3">
                          <p className="moves__checkout__summary__list__text--bold">
                            Moving to
                          </p>
                          <p>
                            {
                              bookingContext.state.formValues?.to_address
                                ?.formatted_address
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 moves__checkout__summary__list mt-3">
                    <div className="row">
                      <div className="col-6 moves__checkout__summary__list__text">
                        <p className="moves__checkout__summary__list__text--bold">
                          Service breakdown
                        </p>
                        {bookingContext.state.formValues?.products?.map(
                          (product: any) => {
                            return <p key={product.id}>{product.title}</p>;
                          }
                        )}
                      </div>
                      <div
                        className="col-6 moves__checkout__summary__list__edit"
                        onClick={() =>
                          bookingContext.dispatch({
                            type: CHANGE_OPEN_SECTION,
                            payload: { openSection: "truck" },
                          })
                        }
                      >
                        Edit
                      </div>
                    </div>
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

export default Checkout;
