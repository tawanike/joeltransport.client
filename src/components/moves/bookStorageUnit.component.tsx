import { useContext, useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { FcInfo } from "react-icons/fc";
import { FiCalendar } from "react-icons/fi";
import { getBooking } from "src/_actions/booking.actions";
import { addStorageCount } from "src/_actions/costSummary.actions";
import { selectTruck } from "src/_actions/trucks.actions";
import { BookingContext } from "src/_contexts/booking.context";
import CostSummaryStateContext from "src/_contexts/costSummary.context";
import {
  formatDate,
  isHoliday,
  stringToDateTime,
} from "src/_helpers/dateFormat";
import { useAPI, useNumberInput } from "src/_hooks";
import { ADD_FORM_VALUES, IProduct } from "src/_models/types";

const BookStorageUnit = () => {
  const api = useAPI();
  const [trucks, setTrucks] = useState<IProduct[]>([]);
  const [recommendedTruck, setRecommendedTruck] = useState<IProduct>();
  const [moveType, setMoveType] = useState<any>();
  const { CostSummaryState, dispatchCostSummary } = useContext(
    CostSummaryStateContext
  );
  const { state: bookingState, dispatch: bookingsDispatch } =
    useContext(BookingContext);
  const { ValueDisplay: NumberOfUnitsDisplay, Value: NumberOfUnitsValue } =
    useNumberInput(bookingState.formValues.storage_units_count);

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
      console.log("PANO", NumberOfUnitsValue);
      trucks.map((truck) => {
        if (
          truck.storage_units_recommendations.min == NumberOfUnitsValue &&
          bookingState.formValues.collection
        ) {
          setRecommendedTruck(truck);
        }
      });

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

      if (recommendedTruck && bookingState.formValues.collection) {
        let price = 0,
          offPeakDiscount: number = 0;
        if (isHoliday(bookingState.formValues.move_date)) {
          price = recommendedTruck.price + recommendedTruck.off_peak_discount;
          offPeakDiscount = 0;
        } else {
          price = recommendedTruck.price;
          offPeakDiscount = recommendedTruck.off_peak_discount;
        }

        dispatchCostSummary(
          selectTruck({
            quantity: 1,
            price: price,
            off_peak_discount: offPeakDiscount,
          })
        );
      }

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
            // setChooseTruckComplete(true);
            api
              .get(`/bookings/${bookingState.formValues.id}`, false)
              .then((res) => {
                if (!res.error) {
                  bookingsDispatch(getBooking({ formValues: res }));
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
        <Form.Group as={Col} md="6" controlId="move_date">
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
      </Row>
      {/* {recommendedTruck && (
        <Alert variant="primary" className="mt-3">
          <div className="row">
            <div className="col-7">
              <p style={{ fontSize: "1rem" }}>
                <b>Recommended {recommendedTruck.title}</b>
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                {" "}
                Loads: standard 2 bedroom house
              </p>
              <p>{recommendedTruck.description}</p>
            </div>
            <div
              className="col-5"
              style={{ display: "grid", placeItems: "start end" }}
            >
              <img src="/img/storage_4ton.png" alt="storage" />
            </div>
          </div>
        </Alert>
      )} */}
    </>
  );
};

export default BookStorageUnit;
