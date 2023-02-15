import { FC, useContext, useEffect } from "react";
import { Alert, Col, Form, Table } from "react-bootstrap";
import { FcInfo } from "react-icons/fc";
import Select from 'react-select';
import { addBakkieShuttle } from "src/_actions/added-services.actions";
import { BookingContext } from "src/_contexts/booking.context";
import CostSummaryStateContext from "../../_contexts/costSummary.context";
import useNumberInput from "../../_hooks/useNumberInput";
import { ADJUST_ADDITIONAL_SERVICES, IProduct } from "../../_models/types";

interface IProps {
}
const AddedServices: FC<IProps> = () => {
    const { CostSummaryState, dispatchCostSummary } = useContext(CostSummaryStateContext);
    const { state: bookingState, dispatch: bookingsDispatch } = useContext(BookingContext);

    const selectBakkieShuttle = (selected: any) => {
        const price = bookingState.products.find(product => product.subtitle === "bakkie-shuttle")?.price || 0;
        dispatchCostSummary(addBakkieShuttle({
            quantity: selected.value === 2 ? 2 : 1,
            price: price
        }));
    }

    return <>
        <div>
            <h5 className="my-3">Do you required a bakkie shuttle?</h5>
            <div>
                <Form.Check
                    inline
                    label="Yes"
                    name="requires_bakkie_shuttle"
                    type="radio"
                    onChange={() => selectBakkieShuttle({ value: "yes" })}
                    className="pe-5"
                />
                <Form.Check
                    inline
                    label="No"
                    name="requires_bakkie_shuttle"
                    onChange={() => selectBakkieShuttle({ value: "no" })}
                    type="radio"
                />
                <Alert variant="primary" className="mt-3">
                    <div className="row">
                        <div className="col-1" style={{ "display": 'grid', "placeItems": "center", fontSize: "2rem" }}>
                            <FcInfo />
                        </div>
                        <div className="col-11">
                            <b>Please note:</b> Only applicable when access for trucks in complexes is restricted, a bakkie is offered at <b>R1,750.00 excl. VAT</b>, to shuttle your items from your house to the truck.
                        </div>
                    </div>
                </Alert>
                <Form.Group as={Col} md="8" controlId="bakkie_address">
                    <Form.Label>Select address for a bakkie shuttle</Form.Label>
                    <Select name="to_property_type"
                        placeholder="Select address"
                        onChange={(values: any) => {

                        }}
                        options={[
                            { value: 0, label: 'Loading address' },
                            { value: 1, label: 'Delivery address' },
                            { value: 2, label: 'Both address' }
                        ]} className='' />
                </Form.Group>
            </div>
        </div>

    </>
}

export default AddedServices;
