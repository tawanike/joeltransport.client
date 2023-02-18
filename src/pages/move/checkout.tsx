import MoveStepper from 'components/moves/move-stepper.component';
import { useContext } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { MdWarning } from 'react-icons/md';
import { usePaystackPayment } from 'react-paystack';
import { BookingContext } from 'src/_contexts/booking.context';
import useAPI from "../../_hooks/useAPI";



const Checkout = () => {
    const fetchWrapper = useAPI();

    const bookingContext = useContext(BookingContext);
    const paystackConfig = {
        reference: "cb7dd9e9-2570-4724-848a-0c3ec24777e23",
        email: "tawanda@mmogomedia.com",
        amount: 20000,
        currency: "ZAR",
        publicKey: 'pk_test_031a560a948c05f7721f754c86ed89d4335d5250',
    };

    const initializePayment = usePaystackPayment(paystackConfig  as any);

    // you can call this function anything
    const onSuccess = (reference: any) => {
      // Implementation for whatever you want to do with reference and after success call.
      console.log(reference);
    };

    // you can call this function anything
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }

    return <>
        <div className="moves container-fluid">
            <div className="moves__container container mt-5">
                <div className="row">
                    <div className="col-8">
                        <Alert variant="warning" className="mt-3">
                            <div className="row">
                                <div className="col-1" style={{ "display": 'grid', "placeItems": "center", fontSize: "2rem", color: "#fa551e" }}>
                                    <MdWarning />
                                </div>
                                <div className="col-11">
                                    Please note: Booking for your move dates is only valid after payment confirmation.
                                </div>
                            </div>
                        </Alert>
                        <MoveStepper />
                    </div>
                    <div className="col-3 offset-1 moves__checkout">
                        <div className="col-12 moves__checkout__summary">
                            <h5>Move summary</h5>
                            <div className="row">
                                <div className="col-12 moves__checkout__summary__list mt-3">
                                    <div className="row">
                                        <div className="col-6 moves__checkout__summary__list__text">
                                            <p>5 Items</p>
                                        </div>
                                        <div className="col-6 moves__checkout__summary__list__price">
                                            R0.00
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 moves__checkout__summary__list moves__checkout__summary__list--bold mt-3">
                                    <div className="row">
                                        <div className="col-6 moves__checkout__summary__list__text">
                                            <p>Total</p>
                                        </div>
                                        <div className="col-6 moves__checkout__summary__list__price">
                                            R0.00
                                        </div>
                                    </div>
                                </div>

                                <Button variant="success" className='mt-3 p-2'
                                onClick={() => {
                                    initializePayment(onSuccess, onClose)
                                }}>Pay R0.00</Button>
                            </div>
                        </div>
                        <div className="col-12 moves__checkout__image my-4">
                            <img src="/img/pay.png" alt="Checkout" />
                        </div>
                        <div className="col-12 moves__checkout__summary">
                            <h5>Move review</h5>
                            <div className="row">
                                <div className="col-12 moves__checkout__summary__list mt-3">
                                    <div className="row">
                                        <div className="col-6 moves__checkout__summary__list__text">
                                            <p>Date</p>
                                            <p>28/01/2023</p>
                                        </div>
                                        <div className="col-6 moves__checkout__summary__list__edit">
                                            Edit
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 moves__checkout__summary__list mt-3">
                                    <div className="row">
                                        <div className="col-6 moves__checkout__summary__list__text">
                                            <p className='moves__checkout__summary__list__text--bold'>Move details</p>
                                            <p>Siya Mkhize</p>
                                        </div>
                                        <div className="col-6 moves__checkout__summary__list__edit">
                                            Edit
                                        </div>
                                        <div className="col-12 moves__checkout__summary__list__text mt-3">
                                            <p className='moves__checkout__summary__list__text--bold'>Moving from</p>
                                            <p>1 durris road forest town,
                                                Johannesburg south</p>
                                        </div>
                                        <div className="col-12 moves__checkout__summary__list__text mt-3">
                                            <p className='moves__checkout__summary__list__text--bold'>Moving to</p>
                                            <p> 2289 alexandra, johannesburg</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 moves__checkout__summary__list mt-3">
                                    <div className="row">
                                        <div className="col-6 moves__checkout__summary__list__text">
                                            <p className='moves__checkout__summary__list__text--bold'>Service breakdown</p>
                                            <p>Truck</p>
                                            <p>Bakkie shuttle</p>
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
}

export default Checkout;
