import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { FcInfo } from "react-icons/fc";
import { FiCalendar } from "react-icons/fi";
import { MdWarning } from "react-icons/md";
import Select from "react-select";
import { getBooking } from "src/_actions/booking.actions";
import { BookingContext } from "src/_contexts/booking.context";
import {
  addHours,
  formatDate,
  holidays,
  stringToDateTime,
} from "src/_helpers/dateFormat";
import { useAPI, useNumberInput } from "src/_hooks";
import { ADD_FORM_VALUES } from "src/_models/types";
import { bookingsService } from "src/_services/bookings.service";
import AddressForm from "./AddressForm.component";

interface IProps {
  hasDelivery: boolean;
  dateLabel: string;
}

const MoveDetails: FC<IProps> = ({ hasDelivery, dateLabel }) => {
  const { state: bookingState, dispatch: bookingsDispatch } =
    useContext(BookingContext);
  const { ValueDisplay: ToFloorsCountDisplay, Value: ToFloorsCountValue } =
    useNumberInput(bookingState.formValues.to_floors_count);
  const { ValueDisplay: FromFloorsCountDisplay, Value: FromFloorsCountValue } =
    useNumberInput(bookingState.formValues.from_floors_count);
  const fetchWrapper = useAPI();
  const [showFromWorkingLift, setShowFromWorkingLift] = useState(false);
  const [showToWorkingLift, setShowToWorkingLift] = useState(false);
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [fromWorkingLift, setFromWorkingLift] = useState(false);
  const [toWorkingLift, setToWorkingLift] = useState(false);

  function tileClassName({ date, view }: any) {
    // Add class to tiles in month view only
    if (view === "month") {
      // TODO: Get holidays by month and highlight them
      const holidayDatesForThisMonth = holidays().filter((thisDate) => {
        if (new Date(thisDate.date).getMonth() === date.getMonth()) {
          return new Date(thisDate.date);
        }
      });

      if (
        holidayDatesForThisMonth
          .map((date) => new Date(date.date).getDate())
          .includes(date.getDate()) &&
        holidayDatesForThisMonth
          .map((date) => new Date(date.date).getMonth())
          .includes(date.getMonth())
      ) {
        return "react-datepicker__day--highlighted";
      }
    }
    return "";
  }

  function onActiveStartDateChange({ activeStartDate }: any) {
    setCurrentMonth(activeStartDate.getMonth());
  }

  useEffect(() => {
    const submitForm = async () => {
      if (bookingState.formValues.id) {
        const booking = await bookingsService.updateBooking(
          bookingState.formValues,
          fetchWrapper
        );
        bookingsDispatch(getBooking(booking));
      } else {
        await bookingsService.createBooking(
          bookingState.formValues,
          fetchWrapper
        );
      }
    };
    if (bookingState.formValues.move_date) {
      submitForm();
    }
  }, []);

  const onDateChange = async (date: Date) => {
    if (bookingState.formValues.id) {
      const booking = await bookingsService.updateBooking(
        { id: bookingState.formValues.id, move_date: formatDate(date) },
        fetchWrapper
      );

      bookingsDispatch(getBooking(booking));
    }
  };

  const getPropertyTypeOption = (value: number) => {
    switch (value) {
      case 0:
        return { value: 0, label: "Single Storey" };
      case 1:
        return { value: 1, label: "Multi Storey" };
      default:
        return { value: 0, label: "Single Storey" };
    }
  };

  useEffect(() => {
    (async () => {
      bookingsDispatch({
        type: ADD_FORM_VALUES,
        payload: {
          to_floors_count: ToFloorsCountValue,
          from_floors_count: FromFloorsCountValue,
          from_working_lift: fromWorkingLift,
          to_working_lift: toWorkingLift,
        },
      });

      if (FromFloorsCountValue > 0) {
        setShowFromWorkingLift(true);
      }

      if (ToFloorsCountValue > 0) {
        setShowToWorkingLift(true);
      }

      if (bookingState.formValues.id) {
        const booking = await bookingsService.updateBooking(
          {
            id: bookingState.formValues.id,
            to_floors_count: ToFloorsCountValue,
            from_floors_count: FromFloorsCountValue,
          },
          fetchWrapper
        );
        bookingsDispatch(getBooking(booking));
      }
    })();
  }, [FromFloorsCountValue, ToFloorsCountValue]);

  const updateTimePeriod = async (move_time_period: any) => {
    if (bookingState.formValues.id) {
      const booking = await bookingsService.updateBooking(
        {
          id: bookingState.formValues.id,
          move_time_period: move_time_period,
        },
        fetchWrapper
      );
      bookingsDispatch(getBooking(booking));
    }
  };

  return (
    <div className="col-12 move__step__body">
      <Alert variant="info">
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
            <b>Please note:</b> Additional charges apply for weekends & public
            holidays.
          </div>
        </div>
      </Alert>
      <Form noValidate>
        {["/storage"].includes(router.pathname) && (
          <Row className="mb-5">
            <Form.Group as={Col} md="12" className="">
              <Form.Label className="col-12">
                Would you prefer we collect and pack your goods for you?
              </Form.Label>
              <Form.Check
                type="radio"
                inline
                name="self_delivery"
                label="Yes - collect"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  bookingsService.updateBooking(
                    {
                      id: bookingState.formValues.id,
                      self_delivery: true,
                    },
                    fetchWrapper
                  );
                  bookingsDispatch({
                    type: ADD_FORM_VALUES,
                    payload: {
                      self_delivery: Boolean(Number(event.target.value)),
                    },
                  });
                }}
                id="self_delivery"
                value={1}
                checked={Number(bookingState.formValues.self_delivery) === 1}
              />
              <Form.Check
                type="radio"
                inline
                name="self_delivery"
                label="No - I will deliver"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  bookingsService.updateBooking(
                    {
                      id: bookingState.formValues.id,
                      self_delivery: false,
                    },
                    fetchWrapper
                  );
                  bookingsDispatch({
                    type: ADD_FORM_VALUES,
                    payload: {
                      id: bookingState.formValues.id,
                      self_delivery: Boolean(Number(event.target.value)),
                    },
                  });
                }}
                id="self_delivery"
                value={0}
                checked={Number(bookingState.formValues.self_delivery) === 0}
              />
            </Form.Group>
          </Row>
        )}
        {(["/move/domestic", "/move/inventory-form", "/move/checkout"].includes(
          router.pathname
        ) ||
          bookingState.formValues.self_delivery) && (
          <>
            <h5 className="my-4 my-md-5">Please provide loading details</h5>
            <Row className="mb-4 mb-md-3">
              <Form.Group as={Col} md="12" controlId="from">
                <Form.Label>
                  <span className="text-danger">*</span>Search loading location
                </Form.Label>
                <AddressForm
                  address={bookingState.formValues.from_address}
                  address_type="from_address"
                />
              </Form.Group>
            </Row>
            <Row className="mb-4 mb-md-3">
              <Form.Group as={Col} md="6" controlId="move_date">
                <Form.Label>
                  <span className="text-danger">*</span>
                  {dateLabel}
                </Form.Label>
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
                  minDate={addHours(new Date(), 24)}
                  // tileDisabled={tileDisabled}
                  tileClassName={tileClassName}
                  className="date-picker"
                  onActiveStartDateChange={onActiveStartDateChange}
                />
                <Alert variant="warning" className="mt-3">
                  <div className="row">
                    <div
                      className="col-2"
                      style={{
                        display: "grid",
                        placeItems: "center",
                        fontSize: "2rem",
                        color: "#fa551e",
                      }}
                    >
                      <MdWarning />
                    </div>
                    <div className="col-10">
                      <b>Please note:</b> If the dates you are looking for are
                      not available, get in touch with us or provide your
                      contact details for other solutions.
                      <Link href="/contact-us">Click here</Link>
                    </div>
                  </div>
                </Alert>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="from_property_type">
                <Form.Label>Property type</Form.Label>
                <Select
                  name="from_property_type"
                  onChange={async (values: any) => {
                    const booking = await bookingsService.updateBooking(
                      {
                        id: bookingState.formValues.id,
                        from_property_type: values.value,
                      },
                      fetchWrapper
                    );
                    bookingsDispatch(getBooking(booking));
                  }}
                  defaultValue={getPropertyTypeOption(
                    bookingState.formValues.from_property_type
                  )}
                  options={[
                    { value: 0, label: "Single Storey" },
                    { value: 1, label: "Multi Storey" },
                  ]}
                  className=""
                />
              </Form.Group>
            </Row>
            <Row className="mb-4 mb-md-3">
              <Form.Group as={Col} md="6" controlId="date" className="mb-4">
                <div className="mb-1">
                  <Form.Label>What level is your apartment on?</Form.Label>
                </div>
                {FromFloorsCountDisplay}
              </Form.Group>
              <Form.Group as={Col} md="6" className="">
                <Form.Label>
                  Does your apartment building have a working lift?
                </Form.Label>
                <br />
                <Form.Check
                  type="radio"
                  inline
                  name="from_working_lift"
                  label="Yes"
                  disabled={bookingState.formValues.from_floors_count === 0}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (bookingState.formValues.id) {
                      bookingsService
                        .updateBooking(
                          {
                            id: bookingState.formValues.id,
                            from_working_lift: true,
                            to_floors_count: ToFloorsCountValue,
                            from_floors_count: FromFloorsCountValue,
                          },
                          fetchWrapper
                        )
                        .then((booking: any) => {
                          bookingsDispatch(getBooking(booking));
                        });
                    }
                    bookingsDispatch({
                      type: ADD_FORM_VALUES,
                      payload: {
                        from_working_lift: Number(event.target.value),
                      },
                    });
                  }}
                  id="yes"
                  value={1}
                  checked={
                    Number(bookingState.formValues.from_working_lift) === 1
                  }
                />
                <Form.Check
                  type="radio"
                  inline
                  name="from_working_lift"
                  label="No"
                  disabled={bookingState.formValues.from_floors_count === 0}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (bookingState.formValues.id) {
                      bookingsService
                        .updateBooking(
                          {
                            id: bookingState.formValues.id,
                            from_working_lift: false,
                            to_floors_count: ToFloorsCountValue,
                            from_floors_count: FromFloorsCountValue,
                          },
                          fetchWrapper
                        )
                        .then((booking: any) => {
                          bookingsDispatch(getBooking(booking));
                        });
                    }
                    bookingsDispatch({
                      type: ADD_FORM_VALUES,
                      payload: {
                        from_working_lift: Number(event.target.value),
                      },
                    });
                  }}
                  id="no"
                  value={0}
                  checked={
                    Number(bookingState.formValues.from_working_lift) === 0
                  }
                />
              </Form.Group>
            </Row>
            <Row className="mb-4 mb-md-3">
              <Form.Group as={Col} md="12" className="">
                <Form.Label>What time should we collect?</Form.Label>
                <Form.Check
                  type="radio"
                  required
                  name="move_time_period"
                  label="Morning between (7am to 12pm)"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    bookingsDispatch({
                      type: ADD_FORM_VALUES,
                      payload: {
                        move_time_period: event.target.value,
                      },
                    });
                    updateTimePeriod(event.target.value);
                  }}
                  id="morning"
                  value="0"
                  checked={
                    Number(bookingState.formValues.move_time_period) === 0
                  }
                />
                <Form.Check
                  type="radio"
                  required
                  name="move_time_period"
                  label="Afternoon between (12pm to 4pm)"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    bookingsDispatch({
                      type: ADD_FORM_VALUES,
                      payload: {
                        move_time_period: event.target.value,
                      },
                    });
                    updateTimePeriod(event.target.value);
                  }}
                  id="afternoon"
                  value="1"
                  checked={
                    Number(bookingState.formValues.move_time_period) === 1
                  }
                />
              </Form.Group>
            </Row>
          </>
        )}

        {hasDelivery && (
          <>
            <h5 className="my-4 my-md-5">Please provide delivery details</h5>
            <Row className="mb-4 mb-md-3">
              <Form.Group as={Col} md="12" controlId="to">
                <Form.Label>
                  <span className="text-danger">*</span>Search delivery location
                </Form.Label>
                <AddressForm
                  address={bookingState.formValues.to_address}
                  address_type="to_address"
                />
              </Form.Group>
            </Row>
            <Row className="mb-4 mb-md-3">
              <Form.Group as={Col} md="6" controlId="to_property_type">
                <Form.Label>Property type</Form.Label>
                <Select
                  name="to_property_type"
                  defaultValue={getPropertyTypeOption(
                    bookingState.formValues.to_property_type
                  )}
                  onChange={(values: any) =>
                    bookingsDispatch({
                      type: ADD_FORM_VALUES,
                      payload: { to_property_type: values.value },
                    })
                  }
                  options={[
                    { value: 0, label: "Single Storey" },
                    { value: 1, label: "Multi Storey" },
                  ]}
                  className="mb-5"
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="date">
                <Form.Label>What level is your apartment on?</Form.Label>
                {ToFloorsCountDisplay}
              </Form.Group>
            </Row>
            <Row className="mb-4 mb-md-3">
              {showToWorkingLift && (
                <Form.Group as={Col} md="6" className="mt-3">
                  <Form.Label>
                    Does your apartment building have a working lift?
                  </Form.Label>
                  <br />
                  <Form.Check
                    type="radio"
                    inline
                    name="to_working_lift"
                    label="Yes"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (bookingState.formValues.id) {
                        bookingsService
                          .updateBooking(
                            {
                              id: bookingState.formValues.id,
                              to_working_lift: true,
                              to_floors_count: ToFloorsCountValue,
                              from_floors_count: FromFloorsCountValue,
                            },
                            fetchWrapper
                          )
                          .then((booking: any) => {
                            bookingsDispatch(getBooking(booking));
                          });
                      }

                      bookingsDispatch({
                        type: ADD_FORM_VALUES,
                        payload: {
                          to_working_lift: Number(event.target.value),
                        },
                      });
                    }}
                    id="yes"
                    value={1}
                    checked={
                      Number(bookingState.formValues.to_working_lift) === 1
                    }
                  />
                  <Form.Check
                    type="radio"
                    inline
                    name="to_working_lift"
                    label="No"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (bookingState.formValues.id) {
                        bookingsService
                          .updateBooking(
                            {
                              id: bookingState.formValues.id,
                              to_working_lift: false,
                              to_floors_count: ToFloorsCountValue,
                              from_floors_count: FromFloorsCountValue,
                            },
                            fetchWrapper
                          )
                          .then((booking: any) => {
                            bookingsDispatch(getBooking(booking));
                          });
                      }
                      bookingsDispatch({
                        type: ADD_FORM_VALUES,
                        payload: {
                          to_working_lift: Number(event.target.value),
                        },
                      });
                    }}
                    id="no"
                    value={0}
                    checked={
                      Number(bookingState.formValues.to_working_lift) === 0
                    }
                  />
                </Form.Group>
              )}
            </Row>
          </>
        )}
      </Form>
    </div>
  );
};

export default React.memo(MoveDetails);
