import { useContext, useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { BsTrash } from "react-icons/bs";
import { FcInfo } from "react-icons/fc";
import { FiCalendar } from "react-icons/fi";
import { getBooking } from "src/_actions/booking.actions";
import {
  addHandlingFee,
  addStorageCount,
} from "src/_actions/costSummary.actions";
import { selectTruck } from "src/_actions/trucks.actions";
import { BookingContext } from "src/_contexts/booking.context";
import CostSummaryStateContext from "src/_contexts/costSummary.context";
import { formatDate, stringToDateTime } from "src/_helpers/dateFormat";
import { useAPI, useNumberInput } from "src/_hooks";
import {
  ADD_FORM_VALUES,
  IProduct,
  ZERO_TRUCK_QUANTITY,
} from "src/_models/types";

const BookStorageUnit = () => {
  const api = useAPI();
  const [trucks, setTrucks] = useState<IProduct[]>([]);
  const [recommendedTruck, setRecommendedTruck] = useState<IProduct | null>();
  const [moveType, setMoveType] = useState<any>();
  const { CostSummaryState, dispatchCostSummary } = useContext(
    CostSummaryStateContext
  );
  const { state: bookingState, dispatch: bookingsDispatch } =
    useContext(BookingContext);
  const {
    ValueDisplay: NumberOfUnitsDisplay,
    Value: NumberOfUnitsValue,
    setAValue,
  } = useNumberInput(bookingState.formValues.storage_units_count);

  const onDateChange = (date: Date) => {
    bookingsDispatch({
      type: ADD_FORM_VALUES,
      payload: { move_date: formatDate(date) },
    });
  };

  useEffect(() => {
    (async () => {
      if (bookingState.formValues.collection) {
        const trucks = await api.get("/products?category=2", false);
        setTrucks(trucks.results);
        setRecommendedTruck(trucks[0]);
      }
      const moves = await api.get("/products?category=1", false);
      moves.results.forEach((move: any) => {
        if (move.slug === "storage") {
          setMoveType(move);
        }
      });
    })();
  }, []);

  useEffect(() => {
    if (moveType && moveType.id) {
      if (bookingState.formValues.collection) {
        if (NumberOfUnitsValue === 0) {
          setRecommendedTruck(null);
          dispatchCostSummary(
            selectTruck({
              quantity: 0,
              price: 0,
              off_peak_discount: 0,
            })
          );
        } else if (NumberOfUnitsValue === 1) {
          setRecommendedTruck(trucks[0]);
          dispatchCostSummary(
            selectTruck({
              quantity: 1,
              price: trucks[0].price,
              off_peak_discount: 0,
            })
          );
        } else if (NumberOfUnitsValue >= 2 && NumberOfUnitsValue < 5) {
          setRecommendedTruck(trucks[1]);
          dispatchCostSummary(
            selectTruck({
              quantity: 1,
              price: trucks[1].price,
              off_peak_discount: 0,
            })
          );
        } else if (NumberOfUnitsValue >= 5 && NumberOfUnitsValue < 9) {
          setRecommendedTruck(trucks[1]);
          dispatchCostSummary(
            selectTruck({
              quantity: 1,
              price: trucks[2].price,
              off_peak_discount: 0,
            })
          );
        } else {
          trucks.map((truck) => {
            if (
              truck.storage_units_recommendations &&
              Number(truck.storage_units_recommendations.min) >=
                NumberOfUnitsValue
            ) {
              if (
                truck.storage_units_recommendations.max >= NumberOfUnitsValue
              ) {
                setRecommendedTruck(truck);
                dispatchCostSummary(
                  selectTruck({
                    quantity: 1,
                    price: truck.price,
                    off_peak_discount: 0,
                  })
                );
              }
            }
          });

          setRecommendedTruck(trucks[0]);
        }
      }
      bookingsDispatch({
        type: ADD_FORM_VALUES,
        payload: {
          storage_units_count: NumberOfUnitsValue,
        },
      });

      dispatchCostSummary(
        addStorageCount({
          quantity: NumberOfUnitsValue,
          price: moveType?.price,
        })
      );

      api
        .post(`/bookings/${bookingState.formValues.id}/products`, {
          product: moveType.id,
          quantity: NumberOfUnitsValue,
          product_type: "storage",
          booking: bookingState.formValues.id,
        })
        .then((res) => {
          if (bookingState.formValues.collection) {
            api.post(`/bookings/${bookingState.formValues.id}/products`, {
              product: recommendedTruck?.id,
              quantity: 1,
              product_type: "truck",
              booking: bookingState.formValues.id,
            });
          }

          if (!res.error) {
            api
              .get(`/bookings/${bookingState.formValues.id}`, false)
              .then((res) => {
                if (!res.error) {
                  bookingsDispatch(getBooking(res));

                  dispatchCostSummary(
                    addHandlingFee({
                      quantity: 1,
                      price: 250,
                      off_peak_discount: 0,
                    })
                  );
                }
              });
          }
        });
    }
  }, [NumberOfUnitsValue]);

  return (
    <>
      <Alert variant="info" className="mt-3">
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
            <b>Please note:</b> Minimum period charge is one month.
          </div>
        </div>
      </Alert>
      <Row>
        <Form.Group as={Col} md="5" controlId="move_date">
          <Form.Label>When would you like to start?</Form.Label>
          <DatePicker
            onChange={onDateChange}
            value={
              bookingState.formValues.move_date &&
              stringToDateTime(bookingState.formValues.move_date)
            }
            calendarIcon={<FiCalendar className="calendar-icon" />}
            clearIcon={null}
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
            minDate={new Date()}
            className="date-picker"
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="date">
          <Form.Label>How many storage units do you need?</Form.Label>
          {NumberOfUnitsDisplay}
        </Form.Group>
        <Form.Group
          as={Col}
          md="1"
          controlId="delete"
          className="d-flex align-items-end pb-3 storage-delete"
        >
          <BsTrash
            onClick={() => {
              setAValue(0);
              setRecommendedTruck(null);
              dispatchCostSummary({ type: ZERO_TRUCK_QUANTITY });
            }}
          />
        </Form.Group>
      </Row>
    </>
  );
};

export default BookStorageUnit;
