import { FC, useContext, useEffect, useState } from "react";
import { Alert, Col, Form } from "react-bootstrap";
import { FcInfo } from "react-icons/fc";
import Select from "react-select";

import { addBakkieShuttle } from "src/_actions/added-services.actions";
import { getBooking } from "src/_actions/booking.actions";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
import { ADD_FORM_VALUES, IProduct } from "src/_models/types";
import CostSummaryStateContext from "../../_contexts/costSummary.context";

interface IProps {}
const AddedServices: FC<IProps> = () => {
  const api = useAPI();
  const { CostSummaryState, dispatchCostSummary } = useContext(
    CostSummaryStateContext
  );
  const { state: bookingState, dispatch: dispatchBookings } =
    useContext(BookingContext);
  const [bakkieShuttle, setBakkieShuttle] = useState<IProduct | null>(null);

  const handleBakkieShuttleAddress = (values: any) => {
    dispatchBookings({
      type: ADD_FORM_VALUES,
      payload: { bakkie_address: values.value },
    });

    if (bakkieShuttle) {
      const price = bakkieShuttle?.price || 0;
      dispatchCostSummary(
        addBakkieShuttle({
          requires_bakkie_shuttle: 1,
          quantity: values.value === 3 ? 1.75 : 1,
          price: price,
        })
      );

      api
        .post(`/bookings/${bookingState.formValues.id}/products`, {
          product: bakkieShuttle?.id,
          address: values.value,
          product_type: "bakkie-shuttle",
          booking: bookingState.formValues.id,
        })
        .then((res) => {
          if (!res.error) {
            // setChooseTruckComplete(true);
            api
              .get(`/bookings/${bookingState.formValues.id}`, false)
              .then((res) => {
                if (!res.error) {
                  dispatchBookings(getBooking({ formValues: res }));
                }
              });
          }
        });
    }
  };

  useEffect(() => {
    (async () => {
      const response = await api.get("/products?category=3", false);
      setBakkieShuttle(
        response.results.find(
          (product: any) => product.slug === "bakkie-shuttle"
        )
      );
    })();
  }, []);

  const getBakkieAddressOption = (value: any) => {
    switch (value) {
      case 1:
        return { value: 1, label: "Loading address" };
      case 2:
        return { value: 2, label: "Delivery address" };
      case 3:
        return { value: 3, label: "Both address" };
      default:
        return {};
    }
  };

  return (
    <>
      <div>
        <h5 className="my-3">Do you required a bakkie shuttle?</h5>
        <div>
          <Form.Check
            inline
            label="Yes"
            name="requires_bakkie_shuttle"
            type="radio"
            value={1}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatchBookings({
                type: ADD_FORM_VALUES,
                payload: {
                  requires_bakkie_shuttle: Number(event.target.value),
                },
              })
            }
            className="pe-5"
            checked={
              Number(bookingState.formValues.requires_bakkie_shuttle) === 1
            }
          />
          <Form.Check
            inline
            label="No"
            value={0}
            name="requires_bakkie_shuttle"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatchBookings({
                type: ADD_FORM_VALUES,
                payload: {
                  requires_bakkie_shuttle: Number(event.target.value),
                  bakkie_address: null,
                },
              })
            }
            type="radio"
            checked={
              Number(bookingState.formValues.requires_bakkie_shuttle) === 0
            }
          />
          <Alert variant="primary" className="mt-3">
            <div className="row">
              <div
                className="col-1"
                style={{
                  display: "grid",
                  placeItems: "center",
                  fontSize: "2rem",
                }}
              >
                <FcInfo />
              </div>
              <div className="col-11">
                <b>Please note:</b> Only applicable when access for trucks in
                complexes is restricted, a bakkie is offered at{" "}
                <b>R1,750.00 excl. VAT</b>, to shuttle your items from your
                house to the truck.
              </div>
            </div>
          </Alert>
          <Form.Group as={Col} md="8" controlId="bakkie_address">
            <Form.Label>Select address for a bakkie shuttle</Form.Label>
            <Select
              name="bakkie_address"
              placeholder="Select address"
              isDisabled={
                !Boolean(bookingState.formValues.requires_bakkie_shuttle)
              }
              defaultValue={getBakkieAddressOption(
                bookingState.formValues.bakkie_address
              )}
              onChange={handleBakkieShuttleAddress}
              options={[
                { value: 1, label: "Loading address" },
                { value: 2, label: "Delivery address" },
                { value: 3, label: "Both address" },
              ]}
              className=""
            />
          </Form.Group>
        </div>
      </div>
    </>
  );
};

export default AddedServices;
