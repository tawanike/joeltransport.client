import { useContext, useEffect } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { FcInfo } from "react-icons/fc";
import { FiCalendar } from "react-icons/fi";
import { addStorageCount } from "src/_actions/costSummary.actions";
import { BookingContext } from "src/_contexts/booking.context";
import CostSummaryStateContext from "src/_contexts/costSummary.context";
import { formatDate, stringToDateTime } from "src/_helpers/dateFormat";
import { useNumberInput } from "src/_hooks";
import { ADD_FORM_VALUES } from "src/_models/types";

const BookStorageUnit = () => {
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
    bookingsDispatch({
      type: ADD_FORM_VALUES,
      payload: {
        storage_units_count: NumberOfUnitsValue,
      },
    });

    dispatchCostSummary(
      addStorageCount({
        quantity: NumberOfUnitsValue,
        price: 500,
      })
    );
  }, [NumberOfUnitsValue]);

  return (
    <>
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
            tileDisabled={({ date, view }) => {
              view === "month" && date.getDay() === 0;
              return (
                date.getFullYear() === 2023 &&
                date.getMonth() === 1 &&
                [1, 2, 13, 17, 28].includes(date.getDate())
              );
            }}
            className="date-picker"
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="date">
          <Form.Label>How many storage units do you need?</Form.Label>
          {NumberOfUnitsDisplay}
        </Form.Group>
      </Row>
      <Alert variant="primary" className="mt-3">
        <div className="row">
          <div className="col-7">
            <p style={{ fontSize: "1rem" }}>
              <b>Recommended 4 Ton truck</b>
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
            <p>
              There is enough space in this vehicle to fit an average double
              bed, two-seater couch, washing machine, double-door refrigerator,
              and a few other items.
            </p>
          </div>
          <div
            className="col-5"
            style={{ display: "grid", placeItems: "start end" }}
          >
            <img src="/img/storage_4ton.png" alt="storage" />
          </div>
        </div>
      </Alert>
    </>
  );
};

export default BookStorageUnit;
