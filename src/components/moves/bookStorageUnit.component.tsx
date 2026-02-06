import { useContext, useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { BsTrash } from "react-icons/bs";
import { FcInfo } from "react-icons/fc";
import { FiCalendar } from "react-icons/fi";
import { getBooking } from "src/_actions/booking.actions";
import { addStorageCount } from "src/_actions/costSummary.actions";
import { selectTruck } from "src/_actions/trucks.actions";
import { BookingContext } from "src/_contexts/booking.context";
import CostSummaryStateContext from "src/_contexts/costSummary.context";
import { formatDate, stringToDateTime } from "src/_helpers/dateFormat";
import recommend_truck from "src/_helpers/recommendations";
import { useAPI, useNumberInput } from "src/_hooks";
import {
  ADD_FORM_VALUES,
  IProduct,
  UPDATE_HAS_DIRTY_FIELDS,
  ZERO_TRUCK_QUANTITY,
} from "src/_models/types";
import { bookingsService } from "src/_services/bookings.service";

const BookStorageUnit = () => {
  const api = useAPI();
  const [trucks, setTrucks] = useState<IProduct[]>([]);
  const [recommendedTruck, setRecommendedTruck] = useState<any | null>();
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

  const onDateChange = async (date: Date | null | any[]) => {
    if (date && date instanceof Date && bookingState.formValues.id) {
      const booking = await bookingsService.updateBooking(
        { id: bookingState.formValues.id, move_date: formatDate(date) },
        api
      );
      bookingsDispatch({
        type: UPDATE_HAS_DIRTY_FIELDS,
        payload: {
          hasDirtyFields: true,
        },
      });
      bookingsDispatch(getBooking(booking));
    }
  };

  useEffect(() => {
    (async () => {
      if (bookingState.formValues.self_delivery) {
        const trucks = await api.get("/products?category=2", false);
        setTrucks(trucks.results);
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
      bookingsDispatch({
        type: UPDATE_HAS_DIRTY_FIELDS,
        payload: {
          hasDirtyFields: false,
        },
      });

      if (bookingState.formValues.self_delivery) {
        if (NumberOfUnitsValue > 1) {
          const recommendation = recommend_truck(trucks, NumberOfUnitsValue);
          dispatchCostSummary(
            selectTruck({
              quantity: 1,
              price: recommendation.price,
              off_peak_discount: 0,
            })
          );
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
          if (
            !bookingState.formValues.self_delivery &&
            NumberOfUnitsValue > 0
          ) {
            const recommendation = recommend_truck(trucks, NumberOfUnitsValue);
            api
              .post(`/bookings/${bookingState.formValues.id}/products`, {
                product: recommendation.id,
                quantity: 1,
                product_type: "truck",
                booking: bookingState.formValues.id,
              })
              .then((res) => {
                if (!res.error) {
                  api
                    .get(`/bookings/${bookingState.formValues.id}`, false)
                    .then((res) => {
                      if (!res.error) {
                        bookingsDispatch(getBooking(res));
                      }
                    });
                }
              });
          } else {
            if (!res.error) {
              api
                .get(`/bookings/${bookingState.formValues.id}`, false)
                .then((res) => {
                  if (!res.error) {
                    bookingsDispatch(getBooking(res));
                  }
                });
            }
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
        <Form.Group as={Col} xs="12" md="5" controlId="move_date">
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
        <Form.Group
          as={Col}
          xs="10"
          md="6"
          controlId="date"
          className="mt-3 mt-md-0"
        >
          <Form.Label>How many storage units do you need?</Form.Label>
          {NumberOfUnitsDisplay}
        </Form.Group>
        <Form.Group
          as={Col}
          md="1"
          xs={2}
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
