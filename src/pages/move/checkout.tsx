import MoveStepper from "components/moves/move-stepper.component";
import StorageStepper from "components/moves/storage-stepper.component";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import { MdWarning } from "react-icons/md";
import { usePaystackPayment } from "react-paystack";
import { BookingContext } from "src/_contexts/booking.context";
import CostSummaryStateContext from "src/_contexts/costSummary.context";
import { Calculations } from "../../_helpers/calculations";

const Checkout = () => {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const bookingContext = useContext(BookingContext);
  const { CostSummaryState, dispatchCostSummary } = useContext(
    CostSummaryStateContext
  );

  useEffect(() => {
    console.log("bookingContext", bookingContext.state);
  }, []);

  const paystackConfig = {
    reference: bookingContext.state.formValues.id,
    email: bookingContext.state.formValues.user?.email || "",
    amount: Calculations.getTotalInCents(CostSummaryState),
    currency: "ZAR",
    publicKey: "pk_test_031a560a948c05f7721f754c86ed89d4335d5250",
  };

  const initializePayment = usePaystackPayment(paystackConfig as any);

  // you can call this function anything
  const onSuccess: any = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    setShowSuccessModal(true);
    localStorage.removeItem("bookingId");
    router.push("/");
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    dispatchCostSummary({ type: "RESET_BOOKING" });
    bookingContext.dispatch({ type: "RESET_COST_SUMMARY" });
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
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
            <div className="col-8">
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
            <div className="col-3 offset-1 moves__checkout">
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
                        <p>5 Items</p>
                      </div>
                      <div className="col-6 moves__checkout__summary__list__price">
                        R
                        {(
                          Calculations.getSubTotal(CostSummaryState) * 0.15 +
                          Calculations.getSubTotal(CostSummaryState)
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 moves__checkout__summary__list moves__checkout__summary__list--bold mt-3">
                    <div className="row">
                      <div className="col-6 moves__checkout__summary__list__text">
                        <p>Total</p>
                      </div>
                      <div className="col-6 moves__checkout__summary__list__price">
                        R
                        {(
                          Calculations.getSubTotal(CostSummaryState) * 0.15 +
                          Calculations.getSubTotal(CostSummaryState)
                        ).toFixed(2)}
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
                    Pay R
                    {(
                      Calculations.getSubTotal(CostSummaryState) * 0.15 +
                      Calculations.getSubTotal(CostSummaryState)
                    ).toFixed(2)}
                  </Button>
                </div>
              </div>
              <div className="col-12 moves__checkout__image my-4">
                <img src="/img/pay.png" alt="Checkout" />
              </div>
              <div className="col-12 moves__checkout__summary">
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
                      <div className="col-6 moves__checkout__summary__list__edit">
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
                      <div className="col-6 moves__checkout__summary__list__edit">
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
                      <div className="col-6 moves__checkout__summary__list__edit">
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
