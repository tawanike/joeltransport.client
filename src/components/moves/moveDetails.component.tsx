import { useContext, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Select from 'react-select';
import { BookingContext } from 'src/_contexts/booking.context';
import { useAPI, useNumberInput } from "src/_hooks";
import { ADD_FORM_VALUES } from 'src/_models/types';
import { bookingsService } from "src/_services/bookings.service";

const MoveDetails = () => {
    const api = useAPI();
    const { state: bookingState, dispatch: bookingsDispatch } = useContext(BookingContext);
    const { ValueDisplay: ToFloorsCountDisplay, Value: ToFloorsCountValue } = useNumberInput();
    const { ValueDisplay: FromFloorsCountDisplay, Value: FromFloorsCountValue } = useNumberInput();
    const fetchWrapper = useAPI();

    useEffect(() => {
        const submitForm = async () => {
            if (bookingState.formValues.id) {
                const updatedBooking = await bookingsService.updateBooking(bookingState.formValues, fetchWrapper);
                console.log(updatedBooking);
            } else {
                const booking = await bookingsService.createBooking(bookingState.formValues, fetchWrapper);
                console.log(booking);
            }
        }

        if (bookingState.formValues.move_date) {
            submitForm();
        }
    }, [bookingState.formValues]);

    return <div className="col-12 move__step__body">

        <Form noValidate>
            <h5 className="my-5">Please provide loading address</h5>
            <Row className="mb-5">
                <Form.Group as={Col} md="12" controlId="from">
                    <Form.Label>Search loading address</Form.Label>
                    <GooglePlacesAutocomplete
                        apiKey="AIzaSyC_GzK_Vl1Z4sC0-SjAlJd8lzhodDk1coE"
                        minLengthAutocomplete={5}
                        selectProps={{
                            value: bookingState.formValues.from,
                            onChange: (location: any) => bookingsDispatch({ type: ADD_FORM_VALUES, payload: { 'from': location } })
                        }}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-5">
                <Form.Group as={Col} md="6" controlId="from_property_type">
                    <Form.Label>Property type</Form.Label>
                    <Select name="from_property_type"
                        onChange={(values: any) => bookingsDispatch({ type: ADD_FORM_VALUES, payload: { 'from_property_type': values } })}
                        options={[
                            { value: 0, label: 'Single Storey' },
                            { value: 1, label: 'Multi Storey' }
                        ]} className='' />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="from_floors">
                    <Form.Label>How many floors is your house</Form.Label>
                    {FromFloorsCountDisplay}
                </Form.Group>
            </Row>

            <Row className="mb-5">
                <Form.Group as={Col} md="6" controlId="move_date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="move_date"
                        value={bookingState.formValues.move_date}
                        placeholder="Choose date"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => bookingsDispatch({ type: ADD_FORM_VALUES, payload: { 'move_date': event.target.value } })}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" className="">
                    <Form.Label>What time would you like to move?</Form.Label>
                    <Form.Check
                        type="radio"
                        required
                        name="move_time_period"
                        label="Morning between (7am to 12pm)"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => bookingsDispatch({ type: ADD_FORM_VALUES, payload: { 'move_time_period': event.target.value } })}
                        id="morning"
                        value="0"
                    />
                    <Form.Check
                        type="radio"
                        required
                        name="move_time_period"
                        label="Afternoon between (12pm to 4pm)"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => bookingsDispatch({ type: ADD_FORM_VALUES, payload: { 'move_time_period': event.target.value } })}
                        id="afternoon"
                        value="1"
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
                            value: bookingState.formValues.to,
                            onChange: (location: string) => bookingsDispatch({ type: ADD_FORM_VALUES, payload: { 'to': location } })
                        }}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-5">
                <Form.Group as={Col} md="6" controlId="to_property_type">
                    <Form.Label>Property type</Form.Label>
                    <Select name="to_property_type"
                        onChange={(values: any) => bookingsDispatch({ type: ADD_FORM_VALUES, payload: { 'to_property_type': values } })}
                        options={[
                            { value: 0, label: 'Single Storey' },
                            { value: 1, label: 'Multi Storey' }
                        ]} className='' />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="date">
                    <Form.Label>To floors count</Form.Label>
                    {ToFloorsCountDisplay}
                </Form.Group>
            </Row>
        </Form>
    </div>
}

export default MoveDetails;
