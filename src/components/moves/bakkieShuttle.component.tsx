import { FC, useContext, useEffect, useState } from "react";
import { Alert, Col, Form } from "react-bootstrap";
import { FcInfo } from "react-icons/fc";
import Select from "react-select";

import { addBakkieShuttle } from "src/_actions/added-services.actions";
import { getBooking } from "src/_actions/booking.actions";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
import {
  ADD_FORM_VALUES,
  IProduct,
  UPDATE_HAS_DIRTY_FIELDS,
} from "src/_models/types";
import CostSummaryStateContext from "../../_contexts/costSummary.context";

interface IProps {}
const BakkieShuttle: FC<IProps> = () => {
  const api = useAPI();
  const { CostSummaryState, dispatchCostSummary } = useContext(
    CostSummaryStateContext
  );
  const { state: bookingState, dispatch: dispatchBookings } =
    useContext(BookingContext);
  const [bakkieShuttle, setBakkieShuttle] = useState<IProduct | null>(null);
  const [bakkieShuttleBothAddresses, setBakkieShuttleBothAddresses] =
    useState<IProduct | null>(null);

  useEffect(() => {
    (async () => {
      const response = await api.get("/products?category=3", false);
      setBakkieShuttle(
        response.results.find(
          (product: any) => product.slug === "bakkie-shuttle"
        )
      );

      setBakkieShuttleBothAddresses(
        response.results.find(
          (product: any) => product.slug === "bakkie-shuttle-both"
        )
      );
    })();
  }, []);

  const handleBakkieShuttleAddress = (values: any) => {
    dispatchBookings({
      type: ADD_FORM_VALUES,
      payload: { bakkie_address: values.value },
    });

    dispatchBookings({
      type: UPDATE_HAS_DIRTY_FIELDS,
      payload: {
        hasDirtyFields: true,
      },
    });

    if (bakkieShuttle) {
      if (values.value === 3 && bakkieShuttleBothAddresses) {
        dispatchCostSummary(
          addBakkieShuttle({
            requires_bakkie_shuttle: 1,
            quantity: 1,
            price: bakkieShuttleBothAddresses.price,
          })
        );
      } else {
        dispatchCostSummary(
          addBakkieShuttle({
            requires_bakkie_shuttle: 1,
            quantity: 1,
            price: bakkieShuttle.price,
          })
        );
      }

      if (values.value === 3 && bakkieShuttleBothAddresses) {
        api
          .post(`/bookings/${bookingState.formValues.id}/products`, {
            product: bakkieShuttleBothAddresses.id,
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
                    dispatchBookings(getBooking(res));
                  }
                });
            }
          });
      } else {
        api
          .post(`/bookings/${bookingState.formValues.id}/products`, {
            product: bakkieShuttle.id,
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
                    dispatchBookings(getBooking(res));
                  }
                });
            }
          });
      }
    }
  };

  const removeBakkieShuttle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchBookings({
      type: ADD_FORM_VALUES,
      payload: {
        requires_bakkie_shuttle: Number(event.target.value),
        bakkie_address: null,
      },
    });

    dispatchBookings({
      type: UPDATE_HAS_DIRTY_FIELDS,
      payload: {
        hasDirtyFields: true,
      },
    });

    dispatchCostSummary(
      addBakkieShuttle({
        requires_bakkie_shuttle: 0,
        quantity: 0,
        price: 0,
      })
    );

    const bakkieShuttle = bookingState.formValues?.products?.find((product) => {
      return (
        product.slug === "bakkie-shuttle-both" ||
        product.slug === "bakkie-shuttle"
      );
    });

    if (bakkieShuttle) {
      api
        .delete(`/bookings/${bookingState.formValues.id}/products`, {
          product: bakkieShuttle?.id,
          booking: bookingState.formValues.id,
        })
        .then((res) => {
          if (!res.error) {
            // setChooseTruckComplete(true);
            api
              .get(`/bookings/${bookingState.formValues.id}`, false)
              .then((res) => {
                if (!res.error) {
                  dispatchBookings(getBooking(res));
                }
              });
          }
        });
    }
  };

  const getBakkieAddressOption = (option: any) => {
    switch (option) {
      case Number(option) === 1:
        return { value: 1, label: "Loading address" };
      case Number(option) === 2:
        return { value: 2, label: "Delivery address" };
      case Number(option) === 3:
        return { value: 3, label: "Both address" };
      default:
        return {};
    }
  };

  return (
    <>
      <div>
        <h5 className="my-3">Do you require a bakkie shuttle?</h5>
        <div>
          <Form.Check
            inline
            label="Yes"
            name="requires_bakkie_shuttle"
            type="radio"
            value={1}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatchBookings({
                type: ADD_FORM_VALUES,
                payload: {
                  requires_bakkie_shuttle: 1,
                  bakkie_address: 1,
                },
              });

              if (bookingState.formValues.move_type === 1) {
                handleBakkieShuttleAddress({
                  value: 1,
                  label: "Loading address",
                });
              }
              dispatchBookings({
                type: UPDATE_HAS_DIRTY_FIELDS,
                payload: {
                  hasDirtyFields: true,
                },
              });
            }}
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
              removeBakkieShuttle(event)
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
          {bookingState.formValues.move_type === 0 && (
            <Form.Group as={Col} md="8" controlId="bakkie_address">
              <Form.Label>Select address for a bakkie shuttle</Form.Label>
              <Select
                name="bakkie_address"
                placeholder="Select address"
                isDisabled={
                  !Boolean(bookingState.formValues.requires_bakkie_shuttle)
                }
                defaultValue={getBakkieAddressOption(
                  bookingState.formValues.bakkie_address || 1
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
          )}
        </div>
      </div>
    </>
  );
};

export default BakkieShuttle;
