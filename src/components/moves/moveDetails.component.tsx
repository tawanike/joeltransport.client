import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import Select from 'react-select';
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import useNumberInput from "../../_hooks/useNumberInput";

const MoveDetails = () => {
    const [isSetFrom, setFrom] = useState(false);
    const [isSetTo, setTo] = useState(false);
    const [bookingId, setBookingId] = useState<string>();
    const { ValueDisplay: BubbleWrapDisplay, Value: BubbleWrapValue } = useNumberInput();

    useEffect(() => {
        (async () => {
            console.log('isSetFrom', isSetFrom);
            console.log('isSetTo', isSetTo);

            if (isSetFrom && isSetTo) {

            }
        })()
    },[isSetFrom, isSetTo])

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
            onSubmit={console.log}
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
                            <Select name="property_type" onChange={handleChange} options={[]} className=''  />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="residency_type">
                            <Form.Label>Residency type</Form.Label>
                            <Select name="residency_type" onChange={handleChange} options={[]} className=''  />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                    </Row>
                    <Row className="mb-5">
                        <Form.Group as={Col} md="6" controlId="date">
                            <Form.Label>From floors count</Form.Label>
                            {BubbleWrapDisplay}
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="date">
                            <Form.Label>To floors count</Form.Label>
                            {BubbleWrapDisplay}
                        </Form.Group>
                    </Row>
                    <Row className="mb-5">
                        <Form.Group as={Col} md="6" controlId="date">
                            <Form.Label>From bedrooms count</Form.Label>
                            {BubbleWrapDisplay}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                                isInvalid={!!errors.move_time_period}
                                feedback={errors.move_time_period}
                                feedbackType="invalid"
                                id="morning"
                                feedbackTooltip
                            />
                            <Form.Check
                                type="radio"
                                required
                                name="move_time_period"
                                label="Afternoon between (12pm to 4pm)"
                                onChange={handleChange}
                                isInvalid={!!errors.move_time_period}
                                feedback={errors.move_time_period}
                                feedbackType="invalid"
                                id="afternoon"
                                feedbackTooltip
                            />
                        </Form.Group>
                    </Row>
                    <Button type="submit">Submit form</Button>
                </Form>
            )}
        </Formik>
    </div>
}

export default MoveDetails;
