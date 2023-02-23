import React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FiCalendar } from "react-icons/fi";
import Select from "react-select";
import { addFormValues } from "src/_actions/form.actions";
import { BookingContext } from "src/_contexts/booking.context";
import { formatDate, stringToDateTime } from "src/_helpers/dateFormat";
import { addressUtils } from "src/_helpers/formatAddress";
import { useAPI, useNumberInput } from "src/_hooks";
import { ADD_FORM_VALUES } from "src/_models/types";
import { bookingsService } from "src/_services/bookings.service";

const MoveDetails = () => {
    const { state: bookingState, dispatch: bookingsDispatch } =
        useContext(BookingContext);
    const { ValueDisplay: ToFloorsCountDisplay, Value: ToFloorsCountValue } =
        useNumberInput(bookingState.formValues.to_floors_count);
    const { ValueDisplay: FromFloorsCountDisplay, Value: FromFloorsCountValue } =
        useNumberInput(bookingState.formValues.from_floors_count);
    const fetchWrapper = useAPI();
    const [showFromWorkingLift, setShowFromWorkingLift] = useState(false);
    const [showToWorkingLift, setShowToWorkingLift] = useState(false);

    useEffect(() => {
        const submitForm = async () => {
            if (bookingState.formValues.id) {
                const updatedBooking = await bookingsService.updateBooking(
                    bookingState.formValues,
                    fetchWrapper
                );
            } else {
                const booking = await bookingsService.createBooking(
                    bookingState.formValues,
                    fetchWrapper
                );
            }
        };
        if (bookingState.formValues.move_date) {
            submitForm();
        }
        console.log("submitting form");
        submitForm();
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
            <Form noValidate>
                <h5 className="my-5">Please provide loading address</h5>
                <Row className="mb-5">
                    <Form.Group as={Col} md="12" controlId="from">
                        <Form.Label>Search loading address</Form.Label>
                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyC_GzK_Vl1Z4sC0-SjAlJd8lzhodDk1coE"
                            minLengthAutocomplete={5}
                            selectProps={{
                                value: {
                                    value: bookingState.formValues.from_address.place_id,
                                    label: bookingState.formValues.from_address.formatted_address,
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
                    </Form.Group>
                </Row>
                <Row className="mb-5">
                    <Form.Group as={Col} md="6" controlId="move_date">
                        <Form.Label>When would you like to move?</Form.Label>
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
                    {showFromWorkingLift && (
                        <Form.Group as={Col} md="6" className="">
                            <Form.Label>Does your house have a working lift?</Form.Label>
                            <Form.Check
                                type="radio"
                                inline
                                name="from_working_lift"
                                label="Yes"
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
                    )}
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
                            checked={Number(bookingState.formValues.move_time_period) === 0}
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
                            checked={Number(bookingState.formValues.move_time_period) === 1}
                        />
                    </Form.Group>
                </Row>

                <h5 className="my-5">Please provide delivery address</h5>
                <Row className="mb-5">
                    <Form.Group as={Col} md="12" controlId="to">
                        <Form.Label>Search delivery address</Form.Label>
                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyC_GzK_Vl1Z4sC0-SjAlJd8lzhodDk1coE"
                            minLengthAutocomplete={5}
                            selectProps={{
                                value: {
                                    value: bookingState.formValues.to_address.place_id,
                                    label: bookingState.formValues.to_address.formatted_address,
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
                                checked={Number(bookingState.formValues.to_working_lift) === 1}
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
                                checked={Number(bookingState.formValues.to_working_lift) === 0}
                            />
                        </Form.Group>
                    )}
                </Row>
            </Form>
        </div>
    );
};

export default React.memo(MoveDetails);
