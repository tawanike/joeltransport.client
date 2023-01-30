import { Formik } from 'formik';
import { Button, Col, InputGroup, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';



const MoveDetails = () => {
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
                property_type: '',
                date: '',
                residency_type: '',
                move_time: ''
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
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-5">
                        <Form.Group as={Col} md="6" controlId="from">
                            <Form.Label>From</Form.Label>
                            <Form.Control
                                as="select"
                                name="from"
                                value={values.from}
                                onChange={handleChange}
                                isValid={touched.from && !errors.from}
                            >
                                <option>Select your city</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="to">
                            <Form.Label>To</Form.Label>
                            <Form.Control
                                as="select"
                                name="to"
                                value={values.to}
                                onChange={handleChange}
                                isValid={touched.to && !errors.to}
                            >
                                <option>Select your city</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-5">
                        <Form.Group as={Col} md="6" controlId="property_type">
                            <Form.Label>Property type</Form.Label>
                            <Form.Control
                                as="select"
                                name="property_type"
                                value={values.property_type}
                                onChange={handleChange}
                                isValid={touched.property_type && !errors.property_type}
                            >
                                <option>Select property</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={values.date}
                                placeholder="Choose date"
                                onChange={handleChange}
                                isValid={touched.date && !errors.date}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-5">
                        <Form.Group as={Col} md="6" controlId="residency_type">
                            <Form.Label>Residency type</Form.Label>
                            <Form.Control
                                as="select"
                                name="residency_type"
                                value={values.residency_type}
                                onChange={handleChange}
                                isValid={touched.residency_type && !errors.residency_type}
                            >
                                <option>Select residency</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" className="">
                            <Form.Label>What time would you like to move?</Form.Label>
                            <Form.Check
                                type="radio"
                                required
                                name="move_time"
                                label="Morning between (6am to 12pm)"
                                onChange={handleChange}
                                isInvalid={!!errors.move_time}
                                feedback={errors.move_time}
                                feedbackType="invalid"
                                id="morning"
                                feedbackTooltip
                            />
                            <Form.Check
                                type="radio"
                                required
                                name="move_time"
                                label="Afternoon between (12pm to 4pm)"
                                onChange={handleChange}
                                isInvalid={!!errors.move_time}
                                feedback={errors.move_time}
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
