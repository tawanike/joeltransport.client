import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FcInfo } from "react-icons/fc";
import { FiCalendar } from "react-icons/fi";
import { MdWarning } from "react-icons/md";
import Select from "react-select";
import { addFormValues } from "src/_actions/form.actions";
import { BookingContext } from "src/_contexts/booking.context";
import {
  formatDate,
  holidays,
  stringToDateTime,
} from "src/_helpers/dateFormat";
import { addressUtils } from "src/_helpers/formatAddress";
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
  const [bookedDates, setBookedDates] = useState<any[]>([]);

  useEffect(() => {
    let booked: any[] = [];
    fetchWrapper
      .get(
        `/bookings/unavailable?month=${
          currentMonth + 1
        }&year=${new Date().getFullYear()}`,
        false
      )
      .then((res) => {
        if (res.length === 0) {
          setBookedDates([]);
          return;
        }

        res.forEach((date: any) => {
          const d = new Date(date.date);
          if (
            currentMonth === d.getMonth() &&
            d.getDate() !== bookingState.formValues.move_date
          ) {
            booked.push(d.getDate());
            setBookedDates([...booked]);
          }
        });
      });
    console.log("bookedDates", bookedDates);
  }, [currentMonth]);

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
  }

  function tileDisabled({ date, view }: any) {
    if (view === "month") {
      return bookedDates.includes(date.getDate());
    }
  }

  function onActiveStartDateChange({ activeStartDate }: any) {
    setCurrentMonth(activeStartDate.getMonth());
  }

  useEffect(() => {
    const submitForm = async () => {
      if (bookingState.formValues.id) {
        await bookingsService.updateBooking(
          bookingState.formValues,
          fetchWrapper
        );
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
  }, [bookingState.formValues]);

  const onDateChange = (date: Date) => {
    bookingsDispatch({
      type: ADD_FORM_VALUES,
      payload: { move_date: formatDate(date) },
    });
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
    bookingsDispatch({
      type: ADD_FORM_VALUES,
      payload: {
        to_floors_count: ToFloorsCountValue,
        from_floors_count: FromFloorsCountValue,
      },
    });

    if (FromFloorsCountValue > 0) {
      setShowFromWorkingLift(true);
    }

    if (ToFloorsCountValue > 0) {
      setShowToWorkingLift(true);
    }
  }, [FromFloorsCountValue, ToFloorsCountValue]);

  return (
    <div className="col-12 move__step__body">
      <Alert variant="primary">
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
                name="collection"
                label="Yes - collect"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  bookingsDispatch({
                    type: ADD_FORM_VALUES,
                    payload: {
                      collection: Boolean(Number(event.target.value)),
                    },
                  })
                }
                id="collection"
                value={1}
                checked={Number(bookingState.formValues.collection) === 1}
              />
              <Form.Check
                type="radio"
                inline
                name="collection"
                label="No - I will deliver"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  bookingsDispatch({
                    type: ADD_FORM_VALUES,
                    payload: {
                      collection: Boolean(Number(event.target.value)),
                    },
                  })
                }
                id="collection"
                value={0}
                checked={Number(bookingState.formValues.collection) === 0}
              />
            </Form.Group>
          </Row>
        )}
        {(["/move/domestic", "/move/inventory-form"].includes(
          router.pathname
        ) ||
          bookingState.formValues.collection) && (
          <>
            <h5 className="my-5">Please provide loading address</h5>
            <Row className="mb-5">
              <Form.Group as={Col} md="12" controlId="from">
                <Form.Label>Search loading address</Form.Label>
                {bookingState.formValues.to_address &&
                bookingState.formValues.to_address.place_id ? (
                  <GooglePlacesAutocomplete
                    apiKey="AIzaSyC_GzK_Vl1Z4sC0-SjAlJd8lzhodDk1coE"
                    minLengthAutocomplete={5}
                    selectProps={{
                      value: {
                        value: bookingState.formValues.from_address.place_id,
                        label:
                          bookingState.formValues.from_address
                            .formatted_address,
                      },
                      onChange: (location: any) =>
                        bookingsDispatch({
                          type: ADD_FORM_VALUES,
                          payload: {
                            from_address: addressUtils.formatAddress(location),
                          },
                        }),
                    }}
                  />
                ) : (
                  <AddressForm
                    address={bookingState.formValues.from_address}
                    booking={bookingState.formValues.id}
                  />
                )}
              </Form.Group>
            </Row>
            <Row className="mb-5">
              <Form.Group as={Col} md="6" controlId="move_date">
                <Form.Label>{dateLabel}</Form.Label>
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
                  tileDisabled={tileDisabled}
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
                  onChange={(values: any) =>
                    bookingsDispatch({
                      type: ADD_FORM_VALUES,
                      payload: { from_property_type: values.value },
                    })
                  }
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
            <Row className="mb-5">
              <Form.Group as={Col} md="6" controlId="date">
                <Form.Label>How many floors does your house have?</Form.Label>
                {FromFloorsCountDisplay}
              </Form.Group>
              <Form.Group as={Col} md="6" className="">
                <Form.Label>Does your house have a working lift?</Form.Label>
                <Form.Check
                  type="radio"
                  inline
                  name="from_working_lift"
                  label="Yes"
                  disabled={bookingState.formValues.from_floors_count === 0}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    bookingsDispatch({
                      type: ADD_FORM_VALUES,
                      payload: {
                        from_working_lift: event.target.value,
                      },
                    })
                  }
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    bookingsDispatch(
                      addFormValues("from_working_lift", event.target.value)
                    )
                  }
                  id="no"
                  value={0}
                  checked={
                    Number(bookingState.formValues.from_working_lift) === 0
                  }
                />
              </Form.Group>
            </Row>
            <Row className="mb-5">
              <Form.Group as={Col} md="12" className="">
                <Form.Label>What time would you like to move?</Form.Label>
                <Form.Check
                  type="radio"
                  required
                  name="move_time_period"
                  label="Morning between (7am to 12pm)"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    bookingsDispatch({
                      type: ADD_FORM_VALUES,
                      payload: {
                        move_time_period: event.target.value,
                      },
                    })
                  }
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    bookingsDispatch({
                      type: ADD_FORM_VALUES,
                      payload: {
                        move_time_period: event.target.value,
                      },
                    })
                  }
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
            <h5 className="my-5">Please provide delivery address</h5>
            <Row className="mb-5">
              <Form.Group as={Col} md="12" controlId="to">
                <Form.Label>Search delivery address</Form.Label>
                {bookingState.formValues.to_address &&
                bookingState.formValues.to_address.place_id ? (
                  <GooglePlacesAutocomplete
                    apiKey="AIzaSyC_GzK_Vl1Z4sC0-SjAlJd8lzhodDk1coE"
                    minLengthAutocomplete={5}
                    selectProps={{
                      value: {
                        value: bookingState.formValues.to_address.place_id,
                        label:
                          bookingState.formValues.to_address.formatted_address,
                      },
                      onChange: (location: string) =>
                        bookingsDispatch({
                          type: ADD_FORM_VALUES,
                          payload: {
                            to_address: addressUtils.formatAddress(location),
                          },
                        }),
                    }}
                  />
                ) : (
                  <AddressForm
                    address={bookingState.formValues.to_address}
                    booking={bookingState.formValues.id}
                  />
                )}
              </Form.Group>
            </Row>
            <Row className="mb-5">
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
                  className=""
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="date">
                <Form.Label>To floors count</Form.Label>
                {ToFloorsCountDisplay}
              </Form.Group>
            </Row>
            <Row className="mb-5">
              {showToWorkingLift && (
                <Form.Group as={Col} md="6" className="">
                  <Form.Label>Does the house have a working lift?</Form.Label>
                  <Form.Check
                    type="radio"
                    inline
                    name="to_working_lift"
                    label="Yes"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      bookingsDispatch({
                        type: ADD_FORM_VALUES,
                        payload: {
                          to_working_lift: event.target.value,
                        },
                      })
                    }
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      bookingsDispatch(
                        addFormValues("to_working_lift", event.target.value)
                      )
                    }
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
