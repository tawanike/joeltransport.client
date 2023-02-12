import { Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Select from 'react-select';
import { getBooking } from 'src/_actions/booking.actions';
import { BookingContext } from 'src/_contexts/booking.context';
import { useAPI, useNumberInput } from "src/_hooks";

import * as yup from 'yup';


const MoveDetails = ({ changeMoveDate }: any) => {
    const api = useAPI();
    const bookingContext = useContext(BookingContext);
    const [isSetTo, setTo] = useState(false);
    const [isSetFrom, setFrom] = useState(false);
    const [ isSetMoveDate, setsSetMoveDate] = useState(false);
    const [ moveDate, setMoveDate] = useState<string | Date>(new Date);
    const [ moveTime, setMoveTime] = useState(0);
    const [isSetMoveTime, setIsSetMoveTime] = useState(false);


    const [isSetPropertyType, setPropertyType] = useState(false);
    const [propertyTypeValue, setPropertyTypeValue] = useState<string>();
    const [residencyTypeValue, setResidencyTypeValue] = useState<string>();

    const [isSetResidencyType, setResidencyType] = useState(false);
    const [bookingId, setBookingId] = useState<string>();
    const { ValueDisplay: ToFloorsCountDisplay, Value: ToFloorsCountValue } = useNumberInput();
    const { ValueDisplay: FromFloorsCountDisplay, Value: FromFloorsCountValue } = useNumberInput();
    const { ValueDisplay: FromBedroomsCountDisplay, Value: FromBedroomsCountValue } = useNumberInput();

    useEffect(() => {
        (async () => {
            changeMoveDate(moveDate);
            // If property type is multi storey, floor count is required
            if (isSetFrom && isSetTo && isSetMoveDate && FromBedroomsCountValue > 0 && isSetMoveTime &&
                isSetPropertyType && isSetResidencyType) {
                    const payload = {
                        from: isSetFrom,
                        to: isSetTo,
                        move_type: 0,
                        move_date: moveDate,
                        move_time_period: moveTime,

                        property_type: propertyTypeValue,
                        // to_property_type: toPropertyTypeValue,

                        residence_type: residencyTypeValue,
                        // to_residence_type: 'to_residence_type',


                        from_bedrooms_count: FromBedroomsCountValue,
                        to_floor_count: ToFloorsCountValue,

                        from_floors_count: FromFloorsCountValue,
                        // to_bedrooms_count: ToBedroomsCountValue,
                    }

                    api.post('/bookings', payload).then((response) => {
                        bookingContext.dispatch(getBooking(response))
                    });
            }
        })()
    },[isSetFrom, isSetTo, isSetMoveDate, FromBedroomsCountValue, moveTime, isSetMoveTime, isSetPropertyType,
        isSetResidencyType, ToFloorsCountValue, FromFloorsCountValue, propertyTypeValue, residencyTypeValue, moveDate]);

    const schema = yup.object().shape({
        from: yup.string().required(),
        to: yup.string().required(),
        property_type: yup.string().required(),
        residency_type: yup.string().required(),
        date: yup.string().required()
    });
    return <div className="col-12 move__step__body">
        <Formik
            validationSchema={schema}
            onSubmit={(values, actions) => {
                console.log(values);
            }}
            initialValues={{
                from: '',
                to: '',
                move_type: '',
                move_date: '',
                move_time_period: '',
                from_residence_type: '',
                to_residence_type: '',
                from_floors_count: 0,
                from_bedrooms_count: 1
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
                setFieldValue
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-5">
                        <Form.Group as={Col} md="6" controlId="from">
                            <Form.Label>From</Form.Label>
                                <GooglePlacesAutocomplete
                                    apiKey="AIzaSyC_GzK_Vl1Z4sC0-SjAlJd8lzhodDk1coE"
                                    minLengthAutocomplete={5}
                                    selectProps={{
                                        value: values.from,
                                        onChange: (location: any) => {setFieldValue('from', location); setFrom(true)}
                                      }}
                                    />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="to">
                            <Form.Label>To</Form.Label>
                                <GooglePlacesAutocomplete
                                    apiKey="AIzaSyC_GzK_Vl1Z4sC0-SjAlJd8lzhodDk1coE"
                                    minLengthAutocomplete={5}
                                    selectProps={{
                                        value: values.to,
                                        onChange: (location: any) => {setFieldValue('to', location); setTo(true)}
                                    }}
                                />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-5">
                        <Form.Group as={Col} md="6" controlId="property_type">
                            <Form.Label>Property type</Form.Label>
                            <Select name="property_type"
                            onChange={(values: any) => {
                                setFieldValue('property_type', values);
                                setPropertyType(true)
                            }}
                            options={[
                                { value: 0, label: 'Single Storey' },
                                { value: 1, label: 'Multi Storey' }
                            ]} className=''  />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="residency_type">
                            <Form.Label>Residency type</Form.Label>
                            <Select name="residency_type"
                            onChange={(values: any) => {
                                setFieldValue('residency_type', values);
                                setResidencyType(true)
                            }}
                            options={[
                                { value: 0, label: 'Apartment' },
                                { value: 1, label: 'Standalone' },
                                { value: 2, label: 'Complex' }
                            ]} className=''  />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                    </Row>
                    <Row className="mb-5">
                        <Form.Group as={Col} md="6" controlId="date">
                            <Form.Label>From floors count</Form.Label>
                            {FromFloorsCountDisplay}
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="date">
                            <Form.Label>To floors count</Form.Label>
                            {ToFloorsCountDisplay}
                        </Form.Group>
                    </Row>
                    <Row className="mb-5">
                        <Form.Group as={Col} md="6" controlId="date">
                            <Form.Label>From bedrooms count</Form.Label>
                            {FromBedroomsCountDisplay}
                        </Form.Group>
                    </Row>
                    <Row className="mb-5">
                        <Form.Group as={Col} md="6" controlId="move_date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="move_date"

                                value={values.move_date}
                                placeholder="Choose date"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(event);
                                    setsSetMoveDate(true);
                                    setMoveDate(event.target.value);
                                }}
                                isValid={touched.move_date && !errors.move_date}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" className="">
                            <Form.Label>What time would you like to move?</Form.Label>
                            <Form.Check
                                type="radio"
                                required
                                name="move_time_period"
                                label="Morning between (6am to 12pm)"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(event);
                                    setIsSetMoveTime(true);
                                    setMoveTime(0);
                                }}
                                isInvalid={!!errors.move_time_period}
                                feedback={errors.move_time_period}
                                feedbackType="invalid"
                                id="morning"
                                value="0"
                                feedbackTooltip
                            />
                            <Form.Check
                                type="radio"
                                required
                                name="move_time_period"
                                label="Afternoon between (12pm to 4pm)"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(event);
                                    setIsSetMoveTime(true);
                                    setMoveTime(1);
                                }}
                                isInvalid={!!errors.move_time_period}
                                feedback={errors.move_time_period}
                                feedbackType="invalid"
                                id="afternoon"
                                value="1"
                                feedbackTooltip
                            />
                        </Form.Group>
                    </Row>
                </Form>
            )}
        </Formik>
    </div>
}

export default MoveDetails;
